import React, {useEffect} from 'react';
import {useDynamicList, useForm, useChoiceField} from './shopify/react-form/src';
import {TextField, AppProvider, Button, Form, FormLayout, PageActions, Page} from '@shopify/polaris'
import '@shopify/polaris/dist/styles.css';

interface Card {
  cardNumber: string;
  cvv: string
}
function App() {

  const emptyCardFactory = (factoryArgument: any): Card => ({
    cardNumber: factoryArgument,
    cvv: '',
  })

  const {fields, addItem, removeItem, reset, dirty: listDirty} = useDynamicList([{cardNumber: '4234 6738 8920 8902', cvv: '422'}], emptyCardFactory);

  const {submit, dirty, submitting} = useForm({
    fields: {
      fields
    },
    onSubmit: async fieldValues => {
      console.log(fieldValues);

      return {status: 'success'};
    }
  })
  return (
      <AppProvider i18n={{}}>
      <Page title="Customer Payment Info">
        <Form onSubmit={submit}>
          <FormLayout>
            {fields.map((field, index) => (
                    <FormLayout.Group key={index}>
                      <TextField placeholder="Card Number" label="Card Number" value={field.cardNumber.value} onChange={field.cardNumber.onChange}/>
                      <TextField placeholder="CVV" label="CVV" value={field.cvv.value} onChange={field.cvv.onChange} key={index}/>
                      <div style={{marginTop: '23px'}}>
                        <Button onClick={() => removeItem ? removeItem(index) : null}>Remove</Button>
                      </div>
                    </FormLayout.Group>
            ))}
            <Button onClick={() => addItem ? addItem('10') : null}>Add Card</Button>
          </FormLayout>
          <PageActions
            primaryAction={{
              content: 'Save',
              disabled: !dirty,
              loading: submitting,
              accessibilityLabel: 'Save',
              onAction: submit,
            }}
            secondaryActions={[
              {
                content: 'Reset',
                onAction: reset,
                accessibilityLabel: 'Reset',
                disabled: !dirty && !listDirty
              },
            ]}
          />
        </Form>
      </Page>
      </AppProvider>
  );
}

export default App;
