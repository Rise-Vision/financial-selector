import Sortable from "sortablejs";
function sortableDirective( $window ) {
  "ngInject";

  return {
    restrict: "AC",
    scope: {
      onSort: "&"
    },
    link: function link( $scope, $element ) {

      var sortable;

      _applySortable();

      function _applySortable() {

        const noop = () => {};

        // needed for solving an iOS 10 scroll bug
        // see https://github.com/metafizzy/flickity/issues/457#issuecomment-254501356
        $window.addEventListener( "touchmove", noop );
        $scope.$on( "$destroy", () => {
          $window.removeEventListener( "touchmove", noop );
        } )

        sortable = Sortable.create( $element[ 0 ], {
          sort: true,
          scroll: true,
          animation: 150,
          handle: ".rv-sortable-handle",
          draggable: ".rv-sortable-item",
          onEnd: ( evt ) => {
            if ( $scope.onSort ) {
              $scope.onSort( {
                evt: evt
              } );
            }
          },
        } );

        $scope.$on( "$destroy", () => {
          sortable.destroy();
        } );
      }
    }
  }
}

export default sortableDirective;
