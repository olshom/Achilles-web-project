const useForm =(initValues) => {
    const [values, setValues] = React.useState(initValues);
}

const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
        ...values,
        [name]: value,
    });
}
const handleDayJSChange = (newValue) => {
    const  v  = newValue;
    setValues({
        ...values,
        [name]: v,
    });
}
const resetForm = () => {
    setValues(initValues);
}

return {
    values,
    handleChange,
    resetForm,
};
}