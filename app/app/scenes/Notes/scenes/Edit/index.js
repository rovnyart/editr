import React, { useEffect, useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import Typography from '@material-ui/core/Typography';

import { useData } from '../../../../hooks/useData';
import Select from '../../../../components/inputs/Select';
import api from '../../../../utils/api';
import AppContext from '../../../../context';

import Editor from './components/Editor';
import AutoSave from './components/AutoSave';
import { languages } from './constants';


languages.forEach((language) => import(`brace/mode/${language}`));

const useStyles = makeStyles({
  fullHeight: { height: '100%' },
});

export default function Edit({ match: { params: { id } = {} }, history }) {
  const classes = useStyles();
  const [, loaded, data,, error] = useData({ dataType: 'note', options: id });
  const { notification } = useContext(AppContext);
  const [update, setUpdate] = useState(null);
  useEffect(() => {
    if (loaded && error) history.push('/notes');
  });
  useEffect(() => {
    if (notification?.id === id) setUpdate(notification.text);
  }, [id, notification]);
  const { note } = data || {};

  const onSubmit = async (values) => api.put(`/api/notes/${id}`, values);
  return (
    <div className={classes.fullHeight}>
      <Form
        onSubmit={() => {}}
        initialValues={{ text: update || note?.text, language: note?.language }}
        render={
          ({ values }) => (
            <div className={classes.fullHeight}>
              <AutoSave debounce={3000} save={onSubmit} debounced={['text']} />
              <Grid container spacing={1} className={classes.fullHeight}>
                <Grid item xs={6}>
                  <Field name="text" component={Editor} language={values?.language} />
                </Grid>
                <Grid item xs={6}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Typography variant="h6" color="secondary">Options</Typography>
                    </Grid>
                    <Grid item>
                      <Field
                        name="language" component={Select} label="Syntax"
                        options={languages.map((lang) => ({ label: lang, value: lang }))}
                      />
                      <OnChange name="language">
                        {(value) => onSubmit({ ...values, language: value })}
                      </OnChange>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
      />
    </div>
  );
}
