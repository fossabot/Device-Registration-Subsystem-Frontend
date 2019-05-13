import React from 'react'
import {INDIVIDUAL_IMPORTER, BULK_IMPORTER, EXPORTER, AUTHORITY} from './../../utilities/constants'

export default function DashboardInstructions(userRole) {
  return (
    <div>
      Spanish
      {(userRole === INDIVIDUAL_IMPORTER || userRole === BULK_IMPORTER) &&
      <ul className="instructions">
        <li>Each Request should only be for single device brand/model.</li>
        <li>Each Request should not have more than 1 million devices.</li>
        <li>In case of Limited (1-10) devices, device count must be equal to entered devices using Webpage
          input.
        </li>
        <li>In case of Bulk (>10) devices, device count must be equal to tab-delimited file using file
          input.
        </li>
        <li>Requester should have all the information related to the device(s) to be registered i.e. IMEIs,
          Brand, Model Name, Model Number, Device Type, Operating System and Radio Access Technology (2G,
          3G, 4G, 5G).
        </li>
        <li>Requester should have all required approval documents for attachment such as:
          <ul>
            <li>
              <div>Shipment document</div>
            </li>
            <li>
              <div>Authorization document</div>
            </li>
            <li>
              <div>Certificate document</div>
            </li>
          </ul>
        </li>
        <li>Size of each approval document should be less than 26MB (the lighter the better).</li>
        <li>Approval Documents are accepted as attachment in the following formats only
          <ul>
            <li>
              <div>.png</div>
            </li>
            <li>
              <div>.jpg</div>
            </li>
            <li>
              <div>.pdf</div>
            </li>
            <li>
              <div>.bmp</div>
            </li>
            <li>
              <div>.gif</div>
            </li>
          </ul>
        </li>
      </ul>
      }
      {userRole === EXPORTER &&
      <ul className="instructions">
        <li>Only registered device(s) can be de-register.</li>
        <li>For device De-Registration the .txt file format is the only accepted file format.</li>
        <li>Each De-registration Request should not have more than 1 million devices.</li>
        <li>Requester should have all required approval documents for attachment such as:
          <ul>
            <li>
              <div>Shipment document</div>
            </li>
            <li>
              <div>Authorization document</div>
            </li>
            <li>
              <div>Certificate document</div>
            </li>
          </ul>
        </li>
        <li>Size of each approval document should be less than 26MB (the lighter the better).</li>
        <li>Approval Documents are accepted as attachment in the following formats only
          <ul>
            <li>
              <div>.png</div>
            </li>
            <li>
              <div>.jpg</div>
            </li>
            <li>
              <div>.pdf</div>
            </li>
            <li>
              <div>.bmp</div>
            </li>
            <li>
              <div>.gif</div>
            </li>
          </ul>
        </li>
      </ul>
      }
      {userRole === AUTHORITY &&
      <ul className="instructions">
        <li>Approval documents for registration/de-registration request are:
          <ul>
            <li>
              <div>Shipment document</div>
            </li>
            <li>
              <div>Authorization document</div>
            </li>
            <li>
              <div>Certificate document</div>
            </li>
          </ul>
        </li>
        <li>Approval documents for registration/de-registration request can be accepted in following
          formats:
          <ul>
            <li>
              <div>.png</div>
            </li>
            <li>
              <div>.jpg</div>
            </li>
            <li>
              <div>.pdf</div>
            </li>
            <li>
              <div>.bmp</div>
            </li>
            <li>
              <div>.gif</div>
            </li>
          </ul>
        </li>
        <li>If any step of the request is selected as Rejected the whole request would be consider as
          rejected request.
        </li>
        <li>If any step of the request is selected as information requested the whole request would be
          considered as information requested.
        </li>
      </ul>
      }
    </div>
)}
