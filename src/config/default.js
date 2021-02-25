/* eslint-disable no-irregular-whitespace */
const config = {
  /**
   * Configure the account/resource type for deployment (with 0 or 1)
   * - accountType: controls account type, 0 for global, 1 for china (21Vianet)
   * - driveType: controls drive resource type, 0 for onedrive, 1 for sharepoint document
   *
   * Followed keys is used for sharepoint resource, change them only if you gonna use sharepoint
   * - hostName: sharepoint site hostname (like 'name.sharepoint.com')
   * - sitePath: sharepoint site path (like '/sites/name')
   * !Note: we do not support deploying onedrive & sharepoint at the same time
   */
  type: {
    accountType: 0,
    driveType: 0,
    hostName: null,
    sitePath: null
  },

  /**
   * You can use this tool http://heymind.github.io/tools/microsoft-graph-api-auth
   * to get following params: client_id, client_secret, refresh_token & redirect_uri.
   */
  refresh_token: '0.AAAAt1FBlq8slkKXiKcl8cmk9M0cnfmE4F5Bs0puQeWg4r9RAM0.AgABAAAAAAD--DLA3VO7QrddgJg7WevrAQDs_wQA9P_alDv6YNjaBrQZZkskukbryh0_3mpYyDNEhUFT5cV-S-3RvbsxX8ucN8935PharfmpHP8R7lYRtpF2c356YJTM21zdJPEAREL-iBFa8_JwhX7Wy4lSTmMkvQ6-YjMpS4day-pWKQtvD94U9Mc2ZCPldg8F965csgL1jeNHD6B9CwdBmqs52mRK2h__Hq5kiLuWy3G2ND7WFD-1NbDJOs07yc_NIqouLWiAnBEVzXyBD1dCcW52u0QyJ51hOd3X4LhCV5tdb6cD34GFkVAMzAwqZbyHeDzPyU1fQEPdseLsCI-NU_lLEXpnz9YHsF0Z9-gObmqgnn6O4D_xwHTsSeTw0We_sYkckYqQZkXZuJ9znKl0ps5xVKSD1ENiid4feU08rDinKnP_E8cpt_z_X8rM-sPuMRVfsGo8Wzd3HhhwtHUBST5WOoTQYPF1bRZabkXwMckU03uRC4NBOuOxZQgvrmpHGHyAGd3EBARAxO2qMDBkutidR2AULV5ydWVgAOEMne0tGtd4HTCTR3V2eHnUzSfBn5aWn_8Y9OIL7Fr8Mr20Aq72JplmqtOEQZwcABjEQxQr2iC3cTe4HmOQq0ZzdJ5jGM5uH3wu9EXr0ZjbGls9qn5Yi53KiBncDUyIMSCzafSPHWhmknB1juQMozJyDjdF9SMhqoXY8KwwSfo-S__07InGddrC2fDrJ1iv5kOnfVc1jY5V7UInWG5Oj3ZnkLGUGjLt3VtZNMUxenFLXMroHtiiyLGhnUtkugBAiR4c7drLDi5HjVolZ6bMpjqYDtFLvGODPA2nc9mqR1iCDQeWKNGOfYpYC5zea-0Z00yaaK_Zg2kKi8lG1iUxmAr6w4W6Iokh4z10Yf5Fpp6qrYMGIl1hWrADfWJ8ZrTYp7nv3qpjqK11vIPILumBPa2G',
  client_id: 'f99d1ccd-e084-415e-b34a-6e41e5a0e2bf',
  client_secret: 'lv63r1vn3Ma9ER7Ei_oLP-N0a_t_1-ErW2',
  redirect_uri: 'https://heymind.github.io/tools/microsoft-graph-api-auth',

  /**
   * The base path for indexing, all files and subfolders are public by this tool. For example: `/Public`.
   */
  base: '/Public',

  /**
   * Feature: Pagination when a folder has multiple(>${top}) files
   * - top: specify the page size limit of the result set, a big `top` value will slow down the fetching speed
   */
  pagination: {
    enable: true,
    top: 100 // default: 200, accepts a minimum value of 1 and a maximum value of 999 (inclusive)
  },

  /**
   * Feature Caching
   * Enable Cloudflare cache for path pattern listed below.
   * Cache rules:
   * - Entire File Cache  0 < file_size < entireFileCacheLimit
   * - Chunked Cache     entireFileCacheLimit  <= file_size < chunkedCacheLimit
   * - No Cache ( redirect to OneDrive Server )   others
   *
   * Difference between `Entire File Cache` and `Chunked Cache`
   *
   * `Entire File Cache` requires the entire file to be transferred to the Cloudflare server before
   *  the first byte sent to a client.
   *
   * `Chunked Cache` would stream the file content to the client while caching it.
   *  But there is no exact Content-Length in the response headers. ( Content-Length: chunked )
   *
   * `previewCache`: using CloudFlare cache to preview
   */
  cache: {
    enable: true,
    entireFileCacheLimit: 10000000, // 10MB
    chunkedCacheLimit: 100000000, // 100MB
    previewCache: false,
    paths: ['/🥟%20Some%20test%20files/Previews']
  },

  /**
   * Feature: Thumbnail
   * Show a thumbnail of image by ?thumbnail=small (small, medium, large)
   * More details: https://docs.microsoft.com/en-us/onedrive/developer/rest-api/api/driveitem_list_thumbnails?view=odsp-graph-online#size-options
   * Example: https://storage.spencerwoo.com/🥟%20Some%20test%20files/Previews/eb37c02438f.png?thumbnail=mediumSquare
   * You can embed this link (url encoded) directly inside Markdown or HTML.
   */
  thumbnail: true,

  /**
   * Small File Upload (<= 4MB)
   * POST https://<base_url>/<directory_path>/?upload=<filename>&key=<secret_key>
   * The <secret_key> is defined by you
   */
  upload: {
    enable: false,
    key: 'your_secret_key_here'
  },

  /**
   * Feature: Proxy Download
   * Use Cloudflare as a relay to speed up download. (Especially in Mainland China)
   * Example: https://storage.spencerwoo.com/🥟%20Some%20test%20files/Previews/eb37c02438f.png?raw&proxied
   * You can also embed this link (url encoded) directly inside Markdown or HTML.
   */
  proxyDownload: true
}

// IIFE to set apiEndpoint & baseResource
// eslint-disable-next-line no-unused-expressions
!(function({ accountType, driveType, hostName, sitePath }) {
  config.apiEndpoint = {
    graph: accountType ? 'https://microsoftgraph.chinacloudapi.cn/v1.0' : 'https://graph.microsoft.com/v1.0',
    auth: accountType
      ? 'https://login.chinacloudapi.cn/common/oauth2/v2.0'
      : 'https://login.microsoftonline.com/common/oauth2/v2.0'
  }
  config.baseResource = driveType ? `/sites/${hostName}:${sitePath}` : '/me/drive'
})(config.type)

export default config
