export const CUSTOM_DIMENSIONS = {
  CURRENCY_PREFERENCE: 1
}
//
// EVENTS
// format: [event_category, event_action, ?event_name, ?event_value]
//
export const ADDRESS_EVENTS = {
  ADD_NEXT_ADDR: ['addresses', 'add_next_addr'],
  DELETE_LABEL: ['addresses', 'delete_label'],
  EDIT_LABEL: ['addresses', 'edit_label'],
  HIDE_USED_ADDRS: ['addresses', 'hide_used'],
  IMPORT_ADDR: ['addresses', 'import'],
  SHOW_CHANGE_ADDRS: ['addresses', 'show_change_addrs'],
  SHOW_USED_ADDRS: ['addresses', 'show_used_addrs']
}
export const LOCKBOX_EVENTS = {
  INSTALL_APP: ['lockbox', 'apps', 'install'],
  UNINSTALL_APP: ['lockbox', 'apps', 'uninstall'],
  SETTINGS: {
    ADD_DEVICE: ['lockbox', 'settings', 'add_device'],
    AUTHENTICATE_DEVICE: ['lockbox', 'settings', 'check_authenticity'],
    FIRMWARE_UPDATE: ['lockbox', 'settings', 'firmware_update'],
    RENAME_DEVICE: ['lockbox', 'settings', 'rename_device'],
    REMOVE_DEVICE: ['lockbox', 'settings', 'remove_device'],
    SHOW_XPUBS: ['lockbox', 'settings', 'show_xpubs'],
    TAKE_TOUR: ['lockbox', 'settings', 'take_tour']
  }
}
export const PREFERENCE_EVENTS = {
  GENERAL: {
    AUTO_LOGOUT: ['preferences', 'general', 'auto_logout'],
    CHANGE_CURRENCY: ['preferences', 'general', 'currency'],
    CHANGE_LANGUAGE: ['preferences', 'general', 'language'],
    CHANGE_THEME: ['preferences', 'general', 'theme'],
    ENABLE_BTC_LINKS: ['preferences', 'general', 'enable_btc_links'],
    SHOW_PAIRING_CODE: ['preferences', 'general', 'show_pairing_code']
  },
  SECURITY: {
    ACTIVITY_LOGGING: ['preferences', 'security', 'activity_logging'],
    BACKUP_PHRASE_VERIFIED: [
      'preferences',
      'security',
      'backup_phrase_verified'
    ],
    EMAIL_VERIFIED: ['preferences', 'security', 'email_verified'],
    PASSWORD_CHANGE: ['preferences', 'security', 'password_change'],
    PASSWORD_STRETCHING: ['preferences', 'security', 'password_stretching'],
    IP_WHITELIST_EDIT: ['preferences', 'security', 'edit_ip_whitelist'],
    IP_RESTRICTIONS: ['preferences', 'security', 'ip_restrictions'],
    TWO_FACTOR_ENABLED: ['preferences', 'security', '2fa_enabled'],
    TWO_FACTOR_DISABLED: ['preferences', 'security', '2fa_disabled'],
    TOR_ACCESS: ['preferences', 'security', 'tor_access']
  }
}
export const TRANSACTION_EVENTS = {
  SEND: ['transactions', 'send'],
  REQUEST: ['transactions', 'request'],
  EDIT_DESCRIPTION: ['transactions', 'edit_description']
}
export const WALLET_EVENTS = {
  ADD_NEW: ['wallets', 'add_new'],
  ARCHIVE: ['wallets', 'archive'],
  CHANGE_DEFAULT: ['wallets', 'change_default'],
  EDIT_NAME: ['wallets', 'edit_name'],
  SHOW_XPUB: ['wallets', 'show_xpub'],
  UNARCHIVE: ['wallets', 'unarchive']
}
