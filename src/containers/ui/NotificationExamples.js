/* eslint-disable no-alert */
import React from 'react';
import { Card, CardBody, CardTitle, Button, CardSubtitle } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';

const NotificationExamples = () => {
  const createNotification = (type, className , message,title ) => {
    const cName = className || '';
    switch (type) {
      case 'primary':
        NotificationManager.primary(
          message,
          title || 'Notification',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'secondary':
        NotificationManager.secondary(
          message ||  'This is a notification!',
          title || 'Secondary Notification',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'info':
        NotificationManager.info('Info message', '', 3000, null, null, cName);
        break;
      case 'success':
        NotificationManager.success(
           message || 'Success message',
          title || 'Success',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'warning':
        NotificationManager.warning(
          message || 'Warning message',
           title || 'Warning',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
           message || 'Error message',
           title || 'Error!',
          5000,
          () => {
            alert('callback');
          },
          null,
          cName
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="alert.react-notifications" />
        </CardTitle>
        <CardSubtitle>
          <IntlMessages id="alert.outline" />
        </CardSubtitle>
        <Button
          outline
          className="mb-3"
          color="primary"
          onClick={() => createNotification('primary')}
        >
          <IntlMessages id="alert.primary" />
        </Button>{' '}
        <Button
          outline
          className="mb-3"
          color="secondary"
          onClick={() => createNotification('secondary')}
        >
          <IntlMessages id="alert.secondary" />
        </Button>{' '}
        <Button
          outline
          className="mb-3"
          color="info"
          onClick={() => createNotification('info')}
        >
          <IntlMessages id="alert.info" />
        </Button>{' '}
        <Button
          outline
          className="mb-3"
          color="success"
          onClick={() => createNotification('success')}
        >
          <IntlMessages id="alert.success" />
        </Button>{' '}
        <Button
          outline
          className="mb-3"
          color="warning"
          onClick={() => createNotification('warning')}
        >
          <IntlMessages id="alert.warning" />
        </Button>{' '}
        <Button
          outline
          className="mb-3"
          color="danger"
          onClick={() => createNotification('error')}
        >
          <IntlMessages id="alert.error" />
        </Button>
        <CardSubtitle>
          <IntlMessages id="alert.filled" />
        </CardSubtitle>
        <Button
          className="mb-3"
          color="primary"
          onClick={() => createNotification('primary', 'filled')}
        >
          <IntlMessages id="alert.primary" />
        </Button>{' '}
        <Button
          className="mb-3"
          color="secondary"
          onClick={() => createNotification('secondary', 'filled')}
        >
          <IntlMessages id="alert.secondary" />
        </Button>{' '}
        <Button
          className="mb-3"
          color="info"
          onClick={() => createNotification('info', 'filled')}
        >
          <IntlMessages id="alert.info" />
        </Button>{' '}
        <Button
          className="mb-3"
          color="success"
          onClick={() => createNotification('success', 'filled')}
        >
          <IntlMessages id="alert.success" />
        </Button>{' '}
        <Button
          className="mb-3"
          color="warning"
          onClick={() => createNotification('warning', 'filled')}
        >
          <IntlMessages id="alert.warning" />
        </Button>{' '}
        <Button
          className="mb-3"
          color="danger"
          onClick={() => createNotification('error', 'filled')}
        >
          <IntlMessages id="alert.error" />
        </Button>
      </CardBody>
    </Card>
  );
};

export default NotificationExamples;
