import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { prop } from 'ramda'
import Bowser from 'bowser'
import React from 'react'

import * as C from 'services/alerts'
import { actions } from 'data'
import { Button, Link } from 'blockchain-info-components'
import {
  SettingComponent,
  SettingContainer,
  SettingDescription,
  SettingHeader,
  SettingSummary
} from 'components/Setting'
import linuxUpdater from 'assets/lockbox/lockbox-updater-1.0.0.AppImage'
import macUpdater from 'assets/lockbox/lockbox-updater-1.0.0.dmg'
import windowsUpdater from 'assets/lockbox/lockbox-updater-1.0.0.exe'

class DownloadUpdaterContainer extends React.PureComponent {
  getOsSpecificUpdater = () => {
    const os = Bowser.getParser(window.navigator.userAgent).getOSName(true)
    switch (os) {
      case 'macos':
        return {
          extension: 'dmg',
          updater: macUpdater
        }
      case 'linux':
        return {
          extension: 'AppImage',
          updater: linuxUpdater
        }
      default:
        return {
          extension: 'exe',
          updater: windowsUpdater
        }
    }
  }

  onSoftwareDownload = () => {
    this.props.modalActions.showModal('Confirm', {
      hideCancel: true,
      title: C.LOCKBOX_SOFTWARE_DOWNLOAD_TITLE,
      message: C.LOCKBOX_SOFTWARE_DOWNLOAD_MSG
    })
    this.props.preferencesActions.hideLockboxSoftwareDownload()
  }

  render () {
    return (
      <SettingContainer>
        <SettingSummary>
          <SettingHeader>
            <FormattedMessage
              id='scenes.lockbox.settings.downloadupdater.title'
              defaultMessage='Download Apps / Update Device'
            />
          </SettingHeader>
          <SettingDescription>
            <FormattedMessage
              id='scenes.lockbox.settings.downloadupdater.description'
              defaultMessage='Download software that allows for updating device and installing/removing apps on the device'
            />
          </SettingDescription>
        </SettingSummary>
        <SettingComponent>
          <Link
            href={prop('updater', this.getOsSpecificUpdater())}
            download={`lockbox-updater-1.0.0.${prop(
              'extension',
              this.getOsSpecificUpdater()
            )}`}
          >
            <Button nature='empty' onClick={this.onSoftwareDownload}>
              <FormattedMessage
                id='scenes.lockbox.dashboard.updaterequirednotice.download'
                defaultMessage='Download'
              />
            </Button>
          </Link>
        </SettingComponent>
      </SettingContainer>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(actions.modals, dispatch)
})

export default connect(null, mapDispatchToProps)(DownloadUpdaterContainer)
