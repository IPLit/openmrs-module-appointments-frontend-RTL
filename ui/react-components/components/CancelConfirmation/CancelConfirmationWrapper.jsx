import CancelConfirmation from "./CancelConfirmation.jsx";
import {IntlProvider} from "react-intl";
import React, {useEffect, useState} from "react";
import {getLocale} from "../../utils/LocalStorageUtil";
import {getMessages} from "../AppContext/AppService";
import PropTypes from "prop-types";
import {CANCEL_CONFIRMATION_MESSAGE_ADD, CANCEL_CONFIRMATION_MESSAGE_EDIT} from "../../constants";
import messages_ar from "../../translations/ar.json";

const CancelConfirmationWrapper = props => {

    const locale = getLocale();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async () => setMessages(await getMessages(locale));
    });

    const getCancelConfirmationMessage = () => props.appointmentUuid
      ? CANCEL_CONFIRMATION_MESSAGE_EDIT : CANCEL_CONFIRMATION_MESSAGE_ADD;

    const cancelConfMessages = locale === "ar" ? messages_ar : messages;
    return (
        <IntlProvider defaultLocale='en' locale={locale} messages={cancelConfMessages}>
            <CancelConfirmation {...getCancelConfirmationMessage()}
                                onBack={props.onBack} close={props.close}/>
        </IntlProvider>
    );
};

CancelConfirmationWrapper.propTypes = {
    onBack: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    appointmentUuid: PropTypes.string.isRequired
};

export default CancelConfirmationWrapper;
