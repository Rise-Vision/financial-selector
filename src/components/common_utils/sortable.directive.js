import Sortable from "sortablejs";
function sortableDirective() {
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
        sortable = Sortable.create( $element[ 0 ], {
          sort: true,
          scroll: false,
          animation: 150,
          handle: ".rv-sortable-handle",
          draggable: ".rv-sortable-item",
          onEnd: ( evt ) => {
            if ( $scope.onSort ) {
              $scope.onSort( {
                evt: evt
              } );
            }
          }
        } );

        $scope.$on( "$destroy", () => {
          sortable.destroy();
        } );
      }
    }
  }
}

export default sortableDirective;
