const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        border: '1px solid gold',
        borderRadius: 5,
        padding: 10,
        paddingLeft: 80,
        fontFamily: 'Montserrat',
        cursor: 'pointer',
        backgroundColor: selected ? 'gold' : '',
        color: selected ? 'black' : '',
        fontWeight: selected ? 700 : 500,
        '&:hover': {
          backgroundColor: 'gold',
          color: 'black',
        },
        width: '22%',
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
