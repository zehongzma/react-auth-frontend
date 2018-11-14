import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { API_URL } from './config'

export default class OAuth extends Component {

  state = {
    user: {},
    disabled: ''
  }

  componentDidMount() {
    const { socket, provider } = this.props

    socket.on(provider, user => {
      this.popup.close()
      this.setState({ user })
    })
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: '' })
      }
    }, 1000)
  }

  openPopup() {
    const { provider, socket } = this.props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    // hand craft the provider's url..?
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup()
      this.checkPopup()
      this.setState({ disabled: 'disabled' })
    }
  }

  closeCard = () => {
    this.setState({ user: {} })
  }

  render() {
    const { name} = this.state.user
    const { provider } = this.props
    const { disabled } = this.state

    return (
      <div>
        {name
          ?
          <div>
            <FontAwesome
              name={'times-circle'}
              className={'close'}
              onClick={this.closeCard}
            />
            <div className={'card'}>
              <div>
                {`${name}`}
              </div>
            </div>
          </div>

          : <div className={'button-wrapper fadein-fast'}>
            <button
              onClick={this.startAuth}
              className={`${provider} ${disabled} button`}
            >
              <FontAwesome
                name={'check-circle'}
              />
            </button>
          </div>
        }
      </div>
    )
  }
}

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
}
