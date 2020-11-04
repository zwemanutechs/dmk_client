import React, {Component} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {notificationCardFetchData} from '../actions/notificationCard-actions';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import ListItemText from "@material-ui/core/ListItemText";

class NotificationCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        //this.props.notificationCardFetchData(this.props.formName, new Date().toISOString());
    }

    render() {
        return (
            this.props.loading
                ? <Skeleton variant="rect"/> :
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                {this.props.formName[0]}
                            </Avatar>
                        }
                        title={this.props.formName}
                    />
                    <List dense={true}>
                        {this.props.data[this.props.formName] === undefined ? [] : this.props.data[this.props.formName].map((dt, i) => {
                            return (
                                <ListItem>
                                    <ListItemIcon>
                                        <ErrorOutlineOutlinedIcon color="secondary"/>
                                    </ListItemIcon>
                                    <ListItemText primary={dt.message}/>
                                </ListItem>
                            );
                        })}
                    </List>
                </Card>
        )
    }
}

const mapStateToProps = state => ({
    data: state.notificationCardItemActions.data,
    loading: state.notificationCardItemActions.loading
});

export default connect(
    mapStateToProps,
    {notificationCardFetchData}
)(NotificationCard)
