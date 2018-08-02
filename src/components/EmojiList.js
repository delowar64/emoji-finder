import React, { Component } from 'react'
import { connect } from 'react-redux'
import Emoji from './Emoji'
import getVisibleEmoji from '../selectors'

class EmojiList extends Component {
    state = {
        allEmoji: getVisibleEmoji(Object.entries(this.props.allEmoji), {text: ''}),
        visibleEmoji: Object.entries(this.props.allEmoji)
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            visibleEmoji: getVisibleEmoji(this.state.allEmoji, {text: nextProps.filterText})
        })
    }
    render() {
        return (
            <div className="emoji_list">
                {
                    this.state.visibleEmoji.map(emoji => (
                        <Emoji
                            key={emoji[0]}
                            emojiData={emoji}
                        />
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    allEmoji: state.emojiReducer,
    filterText: state.filterEmoji.text
})
export default connect(mapStateToProps) (EmojiList)