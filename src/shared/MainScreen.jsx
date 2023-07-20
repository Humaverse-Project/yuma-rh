import Container from '@mui/material/Container';

function MainScreen({maxWidth, children}) {
  return (
    <Container maxWidth={maxWidth || ""}>
      {children}
    </Container>
  );
}

export default MainScreen;
