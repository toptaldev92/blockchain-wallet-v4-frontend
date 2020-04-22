// https://github.com/medipass/react-credit-card-input/blob/master/src/utils/formatter.js
export const DEFAULT_CVC_LENGTH = 3
export const DEFAULT_ZIP_LENGTH = 5
export const DEFAULT_CARD_MIN = 13
export const DEFAULT_CARD_FORMAT = /(\d{1,4})/g
export const DEFAULT_CARD_SVG_LOGO =
  'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTc2IDM3NyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5wbGFjZWhvbGRlcjwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9InBsYWNlaG9sZGVyIj4gICAgICAgICAgICA8cGF0aCBkPSJNNTI3LjkzMzc5MywzNzYuOTk4MjggTDQ4LjA2NjIwNjksMzc2Ljk5ODI4IEMzNS40MjM0ODAzLDM3Ny4xMDM5NjggMjMuMjU2NTg2NCwzNzIuMTg3ODkgMTQuMjQyMzI4MSwzNjMuMzMxNjE4IEM1LjIyODA2OTc1LDM1NC40NzUzNDYgMC4xMDQ5MTcxMDIsMzQyLjQwNDQwNyAwLDMyOS43NzQ0OTQgTDAsNDcuMjI1NDU1NCBDMC4xMDQ5MTcxMDIsMzQuNTk1NTQyNSA1LjIyODA2OTc1LDIyLjUyNDYwNCAxNC4yNDIzMjgxLDEzLjY2ODMzMTkgQzIzLjI1NjU4NjQsNC44MTIwNTk4NSAzNS40MjM0ODAzLC0wLjEwNDAxODI5NiA0OC4wNjYyMDY5LDAuMDAxNjY5NDg2NDYgTDUyNy45MzM3OTMsMC4wMDE2Njk0ODY0NiBDNTQwLjU3NjUyLC0wLjEwNDAxODI5NiA1NTIuNzQzNDE0LDQuODEyMDU5ODUgNTYxLjc1NzY3MiwxMy42NjgzMzE5IEM1NzAuNzcxOTMsMjIuNTI0NjA0IDU3NS44OTUwODMsMzQuNTk1NTQyNSA1NzYsNDcuMjI1NDU1NCBMNTc2LDMyOS45NzI5MTMgQzU3NS42NzI3ODYsMzU2LjE5NTY2MyA1NTQuMTg0MjczLDM3Ny4yMTg4NTcgNTI3LjkzMzc5MywzNzYuOTk4MjggWiIgaWQ9InNoYXBlIiBmaWxsPSIjRThFQkVFIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4gICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBzdHJva2U9IiM3NTc1NzUiIHN0cm9rZS13aWR0aD0iMjAiIHg9IjQxOCIgeT0iNTgiIHdpZHRoPSI5MSIgaGVpZ2h0PSI2MyIgcng9IjMwIj48L3JlY3Q+ICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBmaWxsPSIjNzU3NTc1IiB4PSI1MyIgeT0iMjA4IiB3aWR0aD0iMTA3IiBoZWlnaHQ9IjQwIiByeD0iOCI+PC9yZWN0PiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgZmlsbD0iIzc1NzU3NSIgeD0iNDEzIiB5PSIyMDgiIHdpZHRoPSIxMDciIGhlaWdodD0iNDAiIHJ4PSI4Ij48L3JlY3Q+ICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBmaWxsPSIjNzU3NTc1IiB4PSIyOTMiIHk9IjIwOCIgd2lkdGg9IjEwNyIgaGVpZ2h0PSI0MCIgcng9IjgiPjwvcmVjdD4gICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIGZpbGw9IiM3NTc1NzUiIHg9IjE3MyIgeT0iMjA4IiB3aWR0aD0iMTA3IiBoZWlnaHQ9IjQwIiByeD0iOCI+PC9yZWN0PiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+'

export const CARD_TYPES = [
  {
    type: 'amex',
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    startPattern: /^3[47]/,
    maxCardNumberLength: 15,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: 4,
    logo: DEFAULT_CARD_SVG_LOGO,
    supported: false
  },
  {
    type: 'dankort',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^5019/,
    maxCardNumberLength: 16,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo: DEFAULT_CARD_SVG_LOGO,
    supported: false
  },
  {
    type: 'hipercard',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
    maxCardNumberLength: 19,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo: DEFAULT_CARD_SVG_LOGO,
    supported: false
  },
  {
    type: 'dinersclub',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(36|38|30[0-5])/,
    maxCardNumberLength: 14,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo: DEFAULT_CARD_SVG_LOGO,
    supported: false
  },
  {
    type: 'discover',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(6011|65|64[4-9]|622)/,
    maxCardNumberLength: 16,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo: DEFAULT_CARD_SVG_LOGO,
    supported: false
  },
  {
    type: 'jcb',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^35/,
    maxCardNumberLength: 16,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo: DEFAULT_CARD_SVG_LOGO,
    supported: false
  },
  {
    type: 'laser',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(6706|6771|6709)/,
    maxCardNumberLength: 19,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo: DEFAULT_CARD_SVG_LOGO,
    supported: false
  },
  {
    type: 'maestro',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
    maxCardNumberLength: 19,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo: DEFAULT_CARD_SVG_LOGO,
    supported: false
  },
  {
    type: 'mastercard',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
    maxCardNumberLength: 16,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo:
      'data:image/svg+xml;base64,PHN2ZyBmb2N1c2FibGU9ImZhbHNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAyMSI+ICA8ZyBpZD0iUGFnZS0xIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICA8ZyBpZD0ibWFzdGVyY2FyZCI+ICAgICAgPGcgaWQ9ImNhcmQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMikiPiAgICAgICAgPHBhdGggaWQ9InNoYXBlIiBmaWxsPSIjMDAzNjYzIiBkPSJNMjYuNTggMTlIMi40MkEyLjQgMi40IDAgMCAxIDAgMTYuNjJWMi4zOEEyLjQgMi40IDAgMCAxIDIuNDIgMGgyNC4xNkEyLjQgMi40IDAgMCAxIDI5IDIuMzh2MTQuMjVBMi40IDIuNCAwIDAgMSAyNi41OCAxOXoiLz4gICAgICAgIDxjaXJjbGUgaWQ9InNoYXBlIiBjeD0iMTAuNSIgY3k9IjkuNSIgcj0iNi41IiBmaWxsPSIjRUIxQzI2Ii8+ICAgICAgICA8Y2lyY2xlIGlkPSJzaGFwZSIgY3g9IjE4LjUiIGN5PSI5LjUiIHI9IjYuNSIgZmlsbD0iI0Y5OUYxQiIvPiAgICAgICAgPHBhdGggaWQ9InNoYXBlIiBmaWxsPSIjRUY1RDIwIiBkPSJNMTQuNSA0LjM4YTYuNDkgNi40OSAwIDAgMCAwIDEwLjI0IDYuNDkgNi40OSAwIDAgMCAwLTEwLjI0eiIvPiAgICAgIDwvZz4gICAgPC9nPiAgPC9nPjwvc3ZnPg==',
    supported: true
  },
  {
    type: 'unionpay',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^62/,
    maxCardNumberLength: 19,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo: DEFAULT_CARD_SVG_LOGO,
    supported: false,
    luhn: false
  },
  {
    type: 'visaelectron',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^4(026|17500|405|508|844|91[37])/,
    maxCardNumberLength: 16,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo:
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI1NzZweCIgaGVpZ2h0PSIzNzlweCIgdmlld0JveD0iMCAwIDU3NiAzNzkiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+dmlzYTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9InZpc2EiIGZpbGwtcnVsZT0ibm9uemVybyI+ICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iIzI2MzM3QSIgeD0iMCIgeT0iMCIgd2lkdGg9IjU3NiIgaGVpZ2h0PSIzNzkiIHJ4PSI1MiI+PC9yZWN0PiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iRmlsbC0zIiBmaWxsPSIjRkZGRkZFIiBwb2ludHM9IjIyMSAyNjggMjQyLjU1MTE5MyAxMTEgMjc3IDExMSAyNTUuNDUwNzc5IDI2OCAyMjEgMjY4Ij48L3BvbHlsaW5lPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zOTQuNTIxOTgxLDExNy4zNzIyMjkgQzM4Ny4wNDE1NTcsMTE0LjMyNDA1NiAzNzUuMjc2NzEzLDExMSAzNjAuNjIwOTY4LDExMSBDMzIzLjIxNjY4MywxMTEgMjk2Ljg4Njk3NSwxMzEuNjEwNDk0IDI5Ni42Njg0MjcsMTYxLjEyMzI2OSBDMjk2LjQzMDQwMywxODIuOTUzOTI5IDMxNS40NTcxMjMsMTk1LjEyODY3OCAzMjkuODAxMjc0LDIwMi4zODQ2MzEgQzM0NC41NDM1NzQsMjA5LjgyMjI2MyAzNDkuNDk2NjIzLDIxNC41ODE4MDggMzQ5LjQzODE5OSwyMjEuMjMyMTY0IEMzNDkuMzM2NDk5LDIzMS40MDM5NTUgMzM3LjY3MTE5MSwyMzYuMDY0ODEyIDMyNi43OTM1MjUsMjM2LjA2NDgxMiBDMzExLjY0NjU4NywyMzYuMDY0ODEyIDMwMy41OTkyMzQsMjMzLjc3MDI3MiAyOTEuMTU3MTA1LDIyOC4xMDAwODcgTDI4Ni4yOTA2MTEsMjI1LjY4MjE4MyBMMjgxLDI1OS42Nzg2MiBDMjg5LjgyMjAxLDI2My45MDg4MjkgMzA2LjE3NjM3NywyNjcuNTgwNTQ0IDMyMy4xNDk2MDQsMjY3Ljc3MzQzOCBDMzYyLjkwMTY2NCwyNjcuNzczNDM4IDM4OC43MzE1MjIsMjQ3LjQxMTkxIDM4OS4wMzQ0NjIsMjE1Ljg5NjE4IEMzODkuMTcwNzg1LDE5OC41ODUwNjggMzc5LjA4OTQxNCwxODUuNDYzNzkzIDM1Ny4yNTYxODMsMTc0LjYzMDMzMiBDMzQ0LjAzNTA3LDE2Ny41ODc0NTkgMzM1LjkyMDYzOCwxNjIuOTIyMTE3IDMzNi4wMTM2ODMsMTU1Ljc5NDAxMiBDMzM2LjAyMjMzOSwxNDkuNDgyMzQzIDM0Mi44Njg3NTUsMTQyLjcyNDMyNiAzNTcuNjg2NzksMTQyLjcyNDMyNiBDMzcwLjA2MTgzOSwxNDIuNTE3OTc0IDM3OS4wMjAxNzEsMTQ1LjQ3NDE4NyAzODYuMDAwNzQ2LDE0OC41NjA0ODkgTDM4OS4zOTc5ODgsMTUwLjI5NjUzNSBMMzk0LjUyMTk4MSwxMTcuMzcyMjI5IiBpZD0iRmlsbC00IiBmaWxsPSIjRkZGRkZFIj48L3BhdGg+ICAgICAgICAgICAgPHBhdGggZD0iTTQ0OC4zNTgwMTIsMjEyLjI0NDQ0NCBDNDUxLjU4ODczMSwyMDMuMjE0NDE1IDQ2My44ODczMDgsMTY4LjMzMDk0IDQ2My44ODczMDgsMTY4LjMzMDk0IEM0NjMuNjU5ODg4LDE2OC43NDYyNDYgNDY3LjEwMDE4OSwxNTkuMjMxMzA2IDQ2OS4wNjg5NDIsMTUzLjM0Mjc2MSBMNDcxLjY5OTg5NCwxNjYuODkyNDQ2IEM0NzEuNjk5ODk0LDE2Ni44OTI0NDYgNDc5LjE4MDI2NSwyMDQuMzkwNzMyIDQ4MC43MjA5MzIsMjEyLjI0NDQ0NCBMNDQ4LjM1ODAxMiwyMTIuMjQ0NDQ0IFogTTQ5Ni40NTA4OTIsMTExIEw0NjYuMzI0MjgyLDExMSBDNDU2Ljk3OTk0OSwxMTEgNDQ5Ljk4NTYzNSwxMTMuNzc5NTQyIDQ0NS44OTIwNTQsMTI0LjAyMzAxIEwzODgsMjY4IEw0MjguOTQ0NzIxLDI2OCBDNDI4Ljk0NDcyMSwyNjggNDM1LjYyNDY1OSwyNDguNjMxMzc3IDQzNy4xNDA4MDEsMjQ0LjM4MDg2IEM0NDEuNjA2NzI2LDI0NC4zODA4NiA0ODEuMzkyMDQ2LDI0NC40NjIwNjUgNDg3LjA3MDg4NiwyNDQuNDYyMDY1IEM0ODguMjM5MjA2LDI0OS45NDQ1ODIgNDkxLjgxNzc0NCwyNjggNDkxLjgxNzc0NCwyNjggTDUyOCwyNjggTDQ5Ni40NTA4OTIsMTExIFoiIGlkPSJGaWxsLTUiIGZpbGw9IiNGRkZGRkUiPjwvcGF0aD4gICAgICAgICAgICA8cGF0aCBkPSJNMTg5Ljk1NTA2OCwxMTEgTDE1MS4xMjExNDYsMjE4LjIxOTk2NSBMMTQ2Ljk2MTU4NCwxOTYuNDI0Nzk3IEMxMzkuNzI0OSwxNzEuMzEyOTczIDExNy4xOTc5MTIsMTQ0LjA5NDU2MSA5MiwxMzAuNDU2MzIzIEwxMjcuNTI3NjA0LDI2OCBMMTY5LjUxODA3MywyNjcuOTc0NDUyIEwyMzIsMTExIEwxODkuOTU1MDY4LDExMSIgaWQ9IkZpbGwtNiIgZmlsbD0iI0ZGRkZGRSI+PC9wYXRoPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMTMuOTE4NTUxLDExMSBMNDcuNTQ2MTM4LDExMSBMNDcsMTE0LjMxNDUzMyBDOTguNjQ1NDgwNiwxMjcuNTY1NTc5IDEzMi44MTY4NTUsMTU5LjU1MDk0MyAxNDcsMTk4IEwxMzIuNTc2NzQzLDEyNC40OTY3NDEgQzEzMC4wODg1MTMsMTE0LjM1OTQyIDEyMi44NTY4NzQsMTExLjM1NDM3IDExMy45MTg1NTEsMTExIiBpZD0iRmlsbC03IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=',
    supported: true
  },
  {
    type: 'elo',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
    maxCardNumberLength: 16,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo: DEFAULT_CARD_SVG_LOGO,
    supported: false
  },
  {
    type: 'visa',
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^4/,
    maxCardNumberLength: 19,
    minCardNumberLength: DEFAULT_CARD_MIN,
    cvcLength: DEFAULT_CVC_LENGTH,
    logo:
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI1NzZweCIgaGVpZ2h0PSIzNzlweCIgdmlld0JveD0iMCAwIDU3NiAzNzkiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+dmlzYTwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9InZpc2EiIGZpbGwtcnVsZT0ibm9uemVybyI+ICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iIzI2MzM3QSIgeD0iMCIgeT0iMCIgd2lkdGg9IjU3NiIgaGVpZ2h0PSIzNzkiIHJ4PSI1MiI+PC9yZWN0PiAgICAgICAgICAgIDxwb2x5bGluZSBpZD0iRmlsbC0zIiBmaWxsPSIjRkZGRkZFIiBwb2ludHM9IjIyMSAyNjggMjQyLjU1MTE5MyAxMTEgMjc3IDExMSAyNTUuNDUwNzc5IDI2OCAyMjEgMjY4Ij48L3BvbHlsaW5lPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zOTQuNTIxOTgxLDExNy4zNzIyMjkgQzM4Ny4wNDE1NTcsMTE0LjMyNDA1NiAzNzUuMjc2NzEzLDExMSAzNjAuNjIwOTY4LDExMSBDMzIzLjIxNjY4MywxMTEgMjk2Ljg4Njk3NSwxMzEuNjEwNDk0IDI5Ni42Njg0MjcsMTYxLjEyMzI2OSBDMjk2LjQzMDQwMywxODIuOTUzOTI5IDMxNS40NTcxMjMsMTk1LjEyODY3OCAzMjkuODAxMjc0LDIwMi4zODQ2MzEgQzM0NC41NDM1NzQsMjA5LjgyMjI2MyAzNDkuNDk2NjIzLDIxNC41ODE4MDggMzQ5LjQzODE5OSwyMjEuMjMyMTY0IEMzNDkuMzM2NDk5LDIzMS40MDM5NTUgMzM3LjY3MTE5MSwyMzYuMDY0ODEyIDMyNi43OTM1MjUsMjM2LjA2NDgxMiBDMzExLjY0NjU4NywyMzYuMDY0ODEyIDMwMy41OTkyMzQsMjMzLjc3MDI3MiAyOTEuMTU3MTA1LDIyOC4xMDAwODcgTDI4Ni4yOTA2MTEsMjI1LjY4MjE4MyBMMjgxLDI1OS42Nzg2MiBDMjg5LjgyMjAxLDI2My45MDg4MjkgMzA2LjE3NjM3NywyNjcuNTgwNTQ0IDMyMy4xNDk2MDQsMjY3Ljc3MzQzOCBDMzYyLjkwMTY2NCwyNjcuNzczNDM4IDM4OC43MzE1MjIsMjQ3LjQxMTkxIDM4OS4wMzQ0NjIsMjE1Ljg5NjE4IEMzODkuMTcwNzg1LDE5OC41ODUwNjggMzc5LjA4OTQxNCwxODUuNDYzNzkzIDM1Ny4yNTYxODMsMTc0LjYzMDMzMiBDMzQ0LjAzNTA3LDE2Ny41ODc0NTkgMzM1LjkyMDYzOCwxNjIuOTIyMTE3IDMzNi4wMTM2ODMsMTU1Ljc5NDAxMiBDMzM2LjAyMjMzOSwxNDkuNDgyMzQzIDM0Mi44Njg3NTUsMTQyLjcyNDMyNiAzNTcuNjg2NzksMTQyLjcyNDMyNiBDMzcwLjA2MTgzOSwxNDIuNTE3OTc0IDM3OS4wMjAxNzEsMTQ1LjQ3NDE4NyAzODYuMDAwNzQ2LDE0OC41NjA0ODkgTDM4OS4zOTc5ODgsMTUwLjI5NjUzNSBMMzk0LjUyMTk4MSwxMTcuMzcyMjI5IiBpZD0iRmlsbC00IiBmaWxsPSIjRkZGRkZFIj48L3BhdGg+ICAgICAgICAgICAgPHBhdGggZD0iTTQ0OC4zNTgwMTIsMjEyLjI0NDQ0NCBDNDUxLjU4ODczMSwyMDMuMjE0NDE1IDQ2My44ODczMDgsMTY4LjMzMDk0IDQ2My44ODczMDgsMTY4LjMzMDk0IEM0NjMuNjU5ODg4LDE2OC43NDYyNDYgNDY3LjEwMDE4OSwxNTkuMjMxMzA2IDQ2OS4wNjg5NDIsMTUzLjM0Mjc2MSBMNDcxLjY5OTg5NCwxNjYuODkyNDQ2IEM0NzEuNjk5ODk0LDE2Ni44OTI0NDYgNDc5LjE4MDI2NSwyMDQuMzkwNzMyIDQ4MC43MjA5MzIsMjEyLjI0NDQ0NCBMNDQ4LjM1ODAxMiwyMTIuMjQ0NDQ0IFogTTQ5Ni40NTA4OTIsMTExIEw0NjYuMzI0MjgyLDExMSBDNDU2Ljk3OTk0OSwxMTEgNDQ5Ljk4NTYzNSwxMTMuNzc5NTQyIDQ0NS44OTIwNTQsMTI0LjAyMzAxIEwzODgsMjY4IEw0MjguOTQ0NzIxLDI2OCBDNDI4Ljk0NDcyMSwyNjggNDM1LjYyNDY1OSwyNDguNjMxMzc3IDQzNy4xNDA4MDEsMjQ0LjM4MDg2IEM0NDEuNjA2NzI2LDI0NC4zODA4NiA0ODEuMzkyMDQ2LDI0NC40NjIwNjUgNDg3LjA3MDg4NiwyNDQuNDYyMDY1IEM0ODguMjM5MjA2LDI0OS45NDQ1ODIgNDkxLjgxNzc0NCwyNjggNDkxLjgxNzc0NCwyNjggTDUyOCwyNjggTDQ5Ni40NTA4OTIsMTExIFoiIGlkPSJGaWxsLTUiIGZpbGw9IiNGRkZGRkUiPjwvcGF0aD4gICAgICAgICAgICA8cGF0aCBkPSJNMTg5Ljk1NTA2OCwxMTEgTDE1MS4xMjExNDYsMjE4LjIxOTk2NSBMMTQ2Ljk2MTU4NCwxOTYuNDI0Nzk3IEMxMzkuNzI0OSwxNzEuMzEyOTczIDExNy4xOTc5MTIsMTQ0LjA5NDU2MSA5MiwxMzAuNDU2MzIzIEwxMjcuNTI3NjA0LDI2OCBMMTY5LjUxODA3MywyNjcuOTc0NDUyIEwyMzIsMTExIEwxODkuOTU1MDY4LDExMSIgaWQ9IkZpbGwtNiIgZmlsbD0iI0ZGRkZGRSI+PC9wYXRoPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMTMuOTE4NTUxLDExMSBMNDcuNTQ2MTM4LDExMSBMNDcsMTE0LjMxNDUzMyBDOTguNjQ1NDgwNiwxMjcuNTY1NTc5IDEzMi44MTY4NTUsMTU5LjU1MDk0MyAxNDcsMTk4IEwxMzIuNTc2NzQzLDEyNC40OTY3NDEgQzEzMC4wODg1MTMsMTE0LjM1OTQyIDEyMi44NTY4NzQsMTExLjM1NDM3IDExMy45MTg1NTEsMTExIiBpZD0iRmlsbC03IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=',
    supported: true
  }
]

export type CardNameType =
  | 'amex'
  | 'dankort'
  | 'hipercard'
  | 'dinersclub'
  | 'discover'
  | 'jcb'
  | 'laser'
  | 'maestro'
  | 'mastercard'
  | 'unionpay'
  | 'visaelectron'
  | 'elo'
  | 'visa'

export const getCardTypeByValue = value =>
  CARD_TYPES.find(cardType => cardType.startPattern.test(value))
