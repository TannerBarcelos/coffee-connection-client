export const formatters = {
  convertToMiles: ( m ) => m / 1609,
  nameFormatter: ( name ) => {
    const fullName = name.split( ' ' )
    return fullName
      .map( ( word ) => {
        return word[0].toUpperCase() + word.slice( 1 ) // convert to caps of first letter only
      } )
      .join( ' ' )
  }
}
