import React, { Component } from "react";
class DescriptionModal extends Component {
  state = {};
  render() {
    const { contentId } = this.props;
    const dataTarget = "#" + contentId;
    console.log(contentId);
    return (
      <React.Fragment>
        <p>
          Center the modal vertically and horizontally within the page, with the
          .modal-dialog-centered className.
          <a
            href="ab"
            className="btn-sm btn-tertiary"
            data-toggle="modal"
            data-target={dataTarget}
            style={{ margin: "0px 2px" }}
          >
            Know More..
          </a>
        </p>

        <div className="modal fade" id={contentId}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Modal Heading</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">Modal body..</div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DescriptionModal;
