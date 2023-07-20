import Container from '@mui/material/Container';

function MainScreen({maxWidth, children, ...props}) {
  return (
    <Container maxWidth={maxWidth || ""} sx={{...props}}>
      {children}
    </Container>
  );
}

export default MainScreen;
