import React from 'react';
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';

import closet from './images/closet.png';

const App = () => {
    return (
        <Container maxidth = "lg">
            <AppBar position = "static" color="inherit">
                <Typography variant= "h2" align= "center">StyleMe</Typography> 
                <img src={closet} alt="closet" height = "500"/>
            </AppBar>

        </Container>
    );
}

export default App;