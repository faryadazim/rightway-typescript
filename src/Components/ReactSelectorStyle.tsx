export const customStyles = {
    control: (provided:any, state:any, base:any) => ({
        ...provided,
        border: '1px solid #c2cad8',
        borderRadius: "5px",
        minHeight: '30px',
        height: '30px',
        color: '#555',
        ...base, boxShadow: 'none'
    }),
    option: (provided:any, state:any) => ({
        ...provided,
        color: state.isSelected ? "#f79c74" : "#555",
        background: '#fff',
    }),
    valueContainer: (provided:any, state:any) => ({
        ...provided,
        height: '30px',
        padding: '0 6px',
    }),

    input: (provided:any, state:any) => ({
        ...provided,
        margin: '0px',
        color: "#555"
    }),
    indicatorSeparator: ()=> ({
        display: 'none',
    }),
    indicatorsContainer: (provided:any, state:any) => ({
        ...provided,
        height: '30px',
    }),

}
