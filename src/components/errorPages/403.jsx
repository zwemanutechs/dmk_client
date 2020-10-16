import React, {Component, createRef, useRef} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Forbidden from "../../assets/images/icons/locked.png";
import BrandLogo from "../../assets/images/logo/dormakaba-logo-400x210.png"

class ForbiddenPage  extends Component {

    render() {
        return (
            <Grid container direction="column" justify="center" alignItems="center" spacing={0} style={{minHeight: 750}}>
                <Grid item xs={12}>
                    <img src={BrandLogo}  alt="brand" width='350' height='200'/>
                </Grid>
                   <Grid container direction="row" justify="center" alignItems="center">
                       <Grid item xs={10} md={4}>
                           <Typography variant="h2" gutterBottom>
                               ACCESS DENIED
                           </Typography>
                           <Typography variant="h5" gutterBottom color="textSecondary">
                               You do not have permission to access this resource.
                           </Typography>
                       </Grid>
                       <Grid item xs={2} md={2}>
                           <img src={Forbidden}  alt="locked" width='250' height='240'/>
                       </Grid>
                   </Grid>
            </Grid>
        );
    }

}
export default ForbiddenPage;
