module.exports = {
  get(APP_URL) {
    const f = `
        @font-face {
            font-family: 'THSarabunNew';
            src: url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew-webfont.eot');
            src: url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew-webfont.eot?#iefix') format('embedded-opentype'),
                url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew-webfont.woff') format('woff'),
                url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew-webfont.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
        }
        
        @font-face {
            font-family: 'THSarabunNew';
            src: url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_bolditalic-webfont.eot');
            src: url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_bolditalic-webfont.eot?#iefix') format('embedded-opentype'),
                url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_bolditalic-webfont.woff') format('woff'),
                url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_bolditalic-webfont.ttf') format('truetype');
            font-weight: bold;
            font-style: italic;
        }
        
        @font-face {
            font-family: 'THSarabunNew';
            src: url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_italic-webfont.eot');
            src: url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_italic-webfont.eot?#iefix') format('embedded-opentype'),
                url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_italic-webfont.woff') format('woff'),
                url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_italic-webfont.ttf') format('truetype');
            font-weight: normal;
            font-style: italic;
        }
        
        @font-face {
            font-family: 'THSarabunNew';
            src: url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_bold-webfont.eot');
            src: url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_bold-webfont.eot?#iefix') format('embedded-opentype'),
                url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_bold-webfont.woff') format('woff'),
                url('${APP_URL}/assets/fonts/thsarabunnew/THSarabunNew_bold-webfont.ttf') format('truetype');
            font-weight: bold;
            font-style: normal;
        }
        `;
    return f;
  },
};
