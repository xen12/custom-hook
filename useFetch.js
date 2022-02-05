import { useEffect, useRef, useState } from "react";

export const useFetch = ( url ) => {

  const isMounted = useRef(true);
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });
    fetch( url ).then( resp => resp.json() )
      .then( data => {
        // setState({
        //     loading: false,
        //     error: null,
        //     data
        //   });
        if( isMounted.current ) {
          setState({
            loading: false,
            error: null,
            data
          });
        } else {
          console.log( 'setState no se llamó' );
        }
        // setTimeout(() => {
        // }, 4000);
      })
      .catch( () => {
        setState({
          data: null,
          loading: false,
          error: 'No se pudo cargar la info'
        });
      });
  }, [url]);
  
  return state;
};
