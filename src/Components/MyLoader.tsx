import React from "react"
import ContentLoader, { IContentLoaderProps } from "react-content-loader"

const MyLoader = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader 
    rtl
    speed={2}
    width={200}
    height={260}
    viewBox="0 0 400 460"
    backgroundColor="#000000"
    foregroundColor="#1E2538"
    {...props}
  >
    <circle cx="31" cy="31" r="15" /> 
    <rect x="58" y="18" rx="2" ry="2" width="140" height="10" /> 
    <rect x="58" y="34" rx="2" ry="2" width="140" height="10" /> 
    <rect x="15" y="54" rx="2" ry="2" width="320" height="400" />
  </ContentLoader>
)

export default MyLoader