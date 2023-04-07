import React from 'react'
import Iframe from 'react-iframe'

const AmazonIframe = () => {
  const iframeURL =
    '//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=fluentblogs-21&language=en_IN&marketplace=amazon&region=IN&placement=B09BY17DLV&asins=B09BY17DLV&linkId=c802c446f8b45f62e836dbfa59b27d7a&show_border=true&link_opens_in_new_window=true'

  return (
    <div className='mx-auto max-w-4xl font-sans'>
      <h1 className='py-8 text-center text-4xl font-bold'>Amazon Products</h1>
      <div className='flex justify-center'>
        <Iframe
          url={iframeURL}
          width='120px'
          height='240px'
          scrolling='no'
          frameBorder='0'
          className='rounded border'
        />
      </div>
    </div>
  )
}

export default AmazonIframe
