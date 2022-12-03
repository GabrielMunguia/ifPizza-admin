import { useState } from "react"


export const useForm = ( initialState:any = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }

    const loadValues = ( data:any ) => {
        setValues( data );
    }


    const handleInputChange = ({ target }:any) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    return { values, handleInputChange, reset,loadValues };

}