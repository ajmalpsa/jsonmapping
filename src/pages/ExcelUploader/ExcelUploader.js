import { Card } from '@material-ui/core'
import React from 'react'
import Upload from './components/Upload/Upload'

function ExcelUploader() {

  return (
    <Card className={"card-box "}>
      <div className="card-header d-flex align-items-center justify-content-between card-header-alt p-2 ml-2">
        <div className="d-flex w-100">
          <div style={{ width: '100%' }}>
            <div className="d-flex mb-0 text-black" style={{ marginTop: "10px" }}>
              {'<-'}
              <b>Excel Uploader</b>
              <div style={{ color: "#8c8c8c", fontSize: "14px", marginTop: "4px" }}>

              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="card-body">
        <Upload />
      </div>
    </Card>


  )
}

export default ExcelUploader