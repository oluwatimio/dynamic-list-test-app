import React from 'react';
import {useDynamicList, useForm, useField} from './shopify/react-form/src';
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

  const {submit, dirty, submitting, dynamicLists, reset, fields: {title}} = useForm({
    fields: {
      title: useField(''),
    },
    dynamicLists: {
        fulfillments: useDynamicList<Card>([{cardNumber: '4234 6738 8920 8902', cvv: '422'}, {cardNumber: '4234 6738 8920 8902', cvv: '422'}], emptyCardFactory),
        punta: useDynamicList<Card>([{cardNumber: '4234 6738 8920 8902', cvv: '422'}, {cardNumber: '4234 6738 8920 8902', cvv: '422'}], emptyCardFactory)
    },
    onSubmit: async fieldValues => {
      console.log(fieldValues);

      return {status: 'success'};
    }
  })

  const {fulfillments: {addItem, removeItem, fields: fulfillmentFields}} = dynamicLists
    const {punta: { addItem: addPuntaFields, removeItem: removePuntaFields, fields: puntaFields}} = dynamicLists


    return (
      <AppProvider i18n={{}}>
        <Page title="Customer Payment Info">
          <Form onSubmit={submit}>
            <FormLayout>
              {fulfillmentFields.map((field, index) => (
                  <FormLayout.Group key={index}>
                    <TextField placeholder="Card Number" label="Card Number" value={field.cardNumber.value} onChange={field.cardNumber.onChange}/>
                    <TextField placeholder="CVV" label="CVV" value={field.cvv.value} onChange={field.cvv.onChange} key={index}/>
                    <div style={{marginTop: '23px'}}>
                      <Button onClick={() => removeItem(index)}>Remove</Button>
                    </div>
                  </FormLayout.Group>
              ))}
              <Button onClick={() => addItem('10')}>Add Card</Button>
            </FormLayout>
              <FormLayout>
                  {puntaFields.map((field, index) => (
                      <FormLayout.Group key={index}>
                          <TextField placeholder="Card Number" label="Card Number" value={field.cardNumber.value} onChange={field.cardNumber.onChange}/>
                          <TextField placeholder="CVV" label="CVV" value={field.cvv.value} onChange={field.cvv.onChange} key={index}/>
                          <div style={{marginTop: '23px'}}>
                              <Button onClick={() => removePuntaFields(index)}>Remove</Button>
                          </div>
                      </FormLayout.Group>
                  ))}
                  <Button onClick={() => addPuntaFields('10')}>Add Card</Button>
              </FormLayout>
            <TextField
                placeholder ="some-field"
                label="Additional Field"
                value={title.value}
                onChange={title.onChange}
            />
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
                    onAction: () => {
                        reset();
                    },
                    accessibilityLabel: 'Reset',
                    disabled: !dirty
                  },
                ]}
            />
          </Form>
        </Page>
      </AppProvider>
  );
}

export default App;
