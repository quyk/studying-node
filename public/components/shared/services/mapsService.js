(function(){
    'use restrict'

    angular.module('studying-node')
        .factory('MapsService', ['', function(){

            /**
             * @name getAddressComponents
             * @description
             * Process address components returned from google maps API and return an Object
             * @param addressComponents address components returned from google maps API
             * @return {'street_number', 'route', 'locality', 'administrative_area_level_1','country', 'postal_code' }
             */
            var getAddressComponents = function(addressComponents){

                var address = {};
                var componentForm = {
                    street_number: 'short_name',
                    route: 'long_name',
                    locality: 'long_name',
                    administrative_area_level_1: 'short_name',
                    country: 'long_name',
                    postal_code: 'short_name'
                };
                for (var i = 0; i < address_components.length; i++) {
                    var addressType = address_components[i].types[0];
                    if (componentForm[addressType]) {
                        var val = address_components[i][componentForm[addressType]];
                        address[addressType] = val;
                    }
                }
                return address;
            }

            return {
                getAddressComponents: getAddressComponents(addressComponents)
            }

        }])

})();