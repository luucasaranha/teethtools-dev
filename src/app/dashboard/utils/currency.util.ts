export class CurrencyUtils {

  static formatCurrency(value: any): string {
    if(value === null || value === '') {
      throw new Error("Missing value to proceed")
    }

    let formattedValue = value.replace(/\D/g,'');

    formattedValue = (formattedValue/100).toFixed(2) + '';
    formattedValue = formattedValue.replace(".", ",");

    return "R$ " + formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

}
