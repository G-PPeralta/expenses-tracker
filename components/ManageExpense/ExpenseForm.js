import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { getFormattedDate } from "../../util/date";

import Button from "../UI/Button";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [amount, setAmount] = useState({
    value: defaultValues?.amount.toString() || '',
    isValid: true,
  });
  const [date, setDate] = useState({
    value: getFormattedDate(defaultValues?.date) || '',
    isValid: true,
  });
  const [description, setDescription] = useState({
    value: defaultValues?.description || '',
    isValid: true,
  });

  function amountChangeHandler(enteredText) {
    setAmount({
      value: enteredText,
      isValid: true,
    });
  }

  function dateChangeHandler(enteredText) {
    setDate({
      value: enteredText,
      isValid: true,
    });
  }

  function descriptionChangeHandler(enteredText) {
    setDescription({
      value: enteredText,
      isValid: true,
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +amount.value,
      date: new Date(date.value),
      description: description.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setAmount((currentAmount) => ({
        value: currentAmount.value,
        isValid: amountIsValid,
      }));

      setDate((currentDate) => ({
        value: currentDate.value,
        isValid: dateIsValid,
      }));
      setDescription((currentDescription) => ({
        value: currentDescription.value,
        isValid: descriptionIsValid,
      }));
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid = !amount.isValid || !date.isValid || !description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: amountChangeHandler,
            value: amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!date.isValid}
          textInputConfig={{
            placeholder: 'YYYY/MM/DD',
            maxLength: 10,
            onChangeText: dateChangeHandler,
            value: date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false // default is true,
          // autoCapitalize: 'none',
          onChangeText: descriptionChangeHandler,
          value: description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data</Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});