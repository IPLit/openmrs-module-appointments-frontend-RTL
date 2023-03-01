import classNames from "classnames";
import {appointmentConflict, conflictDetails, conflictsHeading, conflictsList} from "./Body/ConflictsBody.module.scss";
import {FormattedMessage} from "react-intl";
import React from "react";
import PropTypes from "prop-types";
import {getAppointmentConflictDetails} from "./ConflictsUtil";
import {sortBy} from "lodash";

const ServiceUnavailableConflicts = props => {

    const getConflictsList = () => {
        let conflictList = [];
        const conflicts = sortBy(props.conflicts, conflict => conflict.startDateTime);
        conflicts.forEach((conflict, index) => {
            conflictList.push(<div className={classNames(appointmentConflict)} key={index}>
                <div className={classNames(conflictDetails)}>{getAppointmentConflictDetails(conflict)}</div>
            </div>);
        });
        return conflictList;
    };
    const defaultMessage = 'The {label} service you had selected for the appointment(s) is not available during below listed dates';

    return (
        <div>
            <div className={classNames(conflictsHeading)}>
                <FormattedMessage id="NO_SERVICE_CONFLICTS_DEFAULT_TEXT" defaultMessage={defaultMessage} values={{label: decodeURIComponent(props.service.label)}}/>
            </div>
            <div className={classNames(conflictsList)}>
                <ul>{getConflictsList()}</ul>
            </div>
        </div>
    );
};

ServiceUnavailableConflicts.propTypes = {
    conflicts: PropTypes.array.isRequired,
    service: PropTypes.object.isRequired
};

export default ServiceUnavailableConflicts;
