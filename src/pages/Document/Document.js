import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, intlShape } from 'react-intl'
import { Activity } from 'rmw-shell'
import Button from '@material-ui/core/Button'
import { withFirebase } from 'firekit-provider'
import TextField from '@material-ui/core/TextField'
// eslint-disable-next-line
//import firestore from 'firebase/firestore'
//import Typography from '@material-ui/core/Typography'

class Document extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      onlineStatus: ''
    }
  }
  /* Deprecated https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html */
  UNSAFE_componentWillMount() {
    this.handleWatch()
  }

  componentWillUnmount() {
    this.handleUnwatch()
  }

  handleSave = () => {
    const { firebaseApp } = this.props

    let firestore = firebaseApp.firestore()

    const docRef = firestore.doc('samples/sandwichData')

    docRef.set({
      onlineStatus: this.state.value
    })
  }

  handleWatch = () => {
    const { watchDoc } = this.props

    watchDoc('samples/sandwichData')
  }

  handleUnwatch = () => {
    const { unwatchDoc } = this.props

    unwatchDoc('samples/sandwichData')
  }

  handleDestroy = () => {
    const { destroyDoc } = this.props

    destroyDoc('samples/sandwichData')
  }

  render() {
    const { intl, sandwichData, isWatching } = this.props

    return (
      <Activity title={intl.formatMessage({ id: 'document' })}>

        <div style={{ padding: 15 }}>
          <h2 style={{color:'#969696'}}>
            {`${intl.formatMessage({ id: 'online_status' })}: ${sandwichData.onlineStatus}`}
          </h2>
          <TextField
            value={this.state.value}
            onChange={(e) => {
              this.setState({ value: e.target.value })
            }}
            placeholder={intl.formatMessage({ id: 'online_status' })}
          /><br />
          <Button variant="raised" color="primary" onClick={this.handleSave} style={{ margin: 12, marginLeft: 0 }} >
            Save
          </Button>
          <Button variant="raised" color="primary" onClick={this.handleWatch} disabled={isWatching} style={{ margin: 12, marginLeft: 0 }} >
            Watch
          </Button>
          <Button variant="raised" color="primary" onClick={this.handleUnwatch} disabled={!isWatching} style={{ margin: 12, marginLeft: 0 }} >
            Unwatch
          </Button>
          <Button variant="raised" color="secondary" onClick={this.handleDestroy} style={{ margin: 12, marginLeft: 0 }} >
            Destroy
          </Button>

        </div>

      </Activity>
    )

  }
}

Document.propTypes = {
  intl: intlShape.isRequired,
}

const mapStateToProps = (state) => {
  const { docs, initialization } = state

  const sandwichData = docs['samples/sandwichData'] ? docs['samples/sandwichData'] : {}
  const isWatching = initialization['samples/sandwichData'] ? true : false

  return {
    sandwichData,
    isWatching
  }
}

export default connect(
  mapStateToProps, {}
)(injectIntl(withFirebase(Document)))
