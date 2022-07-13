 
export const preventMinus = (e:any) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
};