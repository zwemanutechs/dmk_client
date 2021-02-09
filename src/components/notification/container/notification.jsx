import React, {Component, PureComponent} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NotificationCard from "../../../shared/notification-card/container/notificationCard";
import {withStyles} from "@material-ui/core/styles";

const useStyles = theme => ({
});

class Notification extends PureComponent {

    render() {
        return (
            <Grid container direction="row" wrap="wrap" spacing={2}>
                <Grid item lg={12}>
                    <Typography variant="h4" component="h4">
                        Notification
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='DEGREASING'
                        title='DEGREASING(TANK 01)'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='RINSEONE'
                        title='WATER RINSE (TANK 2)'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='RINSETWO'
                        title='WATER RINSE (TANK 3)'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='RINSETHREE'
                        title='WATER RINSE (TANK 4)'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='DIRINSE'
                        title='DI WATER RINSE (TANK 5)'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='PASSIVATION'
                        title='PASSIVATION (TANK 6)'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='NEUEVAP'
                        title='NEUTRALIZATION (TANK 03-09)'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='CONVERSION'
                        title='DISTILLED WATER(TANK 05)'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='PAINTBOOTH'
                        title='PAINT BOOTH'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='PRIMERCABINETONE'
                        title='PRIMER CABINET 1'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='PRIMERCABINETTWO'
                        title='PRIMER CABINET 2'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='TOPCOATCABINETONE'
                        title='TOPCOAT CABINET 1'
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <NotificationCard
                        formName='TOPCOATCABINETTWO'
                        title='TOPCOAT CABINET 2'
                    />
                </Grid>
            </Grid>
        )
    }
}
export default withStyles(useStyles, { withTheme: true })(Notification)
