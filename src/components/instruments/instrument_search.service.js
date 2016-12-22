class instrumentSearchService {
  constructor( $http, $q ) {
    "ngInject";

    const endpointRoot = "https://contentfinancial2.appspot.com/_ah/api/financial/v1.00/",
      queryUrl = endpointRoot + "instrument/search?category=CATEGORY&query=QUERY",
      popularUrl = endpointRoot + "instruments/common?category=CATEGORY";

    let results = {
      keyword: {},
      popular: {}
    };

    return {
      keywordSearch( category, keyword ) {
        let keywordProp = category + "|" + keyword;

        if ( results.keyword[ keywordProp ] ) {
          return $q.when( results.keyword[ keywordProp ] );
        }

        return $http.get( queryUrl.replace( "CATEGORY", category ).replace( "QUERY", keyword ) )
        .then( ( resp ) => {
          results.keyword[ keywordProp ] = resp.data.items;
          return results.keyword[ keywordProp ];
        } );
      },

      popularSearch( category ) {
        if ( results.popular[ category ] ) {
          return $q.when( results.popular[ category ] );
        }

        return $http.get( popularUrl.replace( "CATEGORY", category ) )
        .then( ( resp ) => {
          results.popular[ category ] = resp.data.items;
          return results.popular[ category ];
        } );
      },
    };
  }
}

export default instrumentSearchService
