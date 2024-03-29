import { useState, useEffect } from 'react'
import Card from './Shered/Card'
import Button from './Shered/Button'
import SelectRating from './SelectRating'
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
    const { addFeedback, feedbackEdit, editFeedback, updateFeedback } = useContext(FeedbackContext)
    const [text, setText] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)

    useEffect(() => {
        if(feedbackEdit.edit) {
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
            setDisableButton(false)
        } else {
            setText('')
            setDisableButton(true)
            setRating(10)        }
    }, [feedbackEdit])
    
    const handleTextChange = ({target: { value }}) => {
        if(value === '') {
            setDisableButton(true)
            setMessage('')
        } else if(value !== '' && value.trim().length < 10) {
            setDisableButton(true)
            setMessage('Text must be at least 10 characters')
        } else {
            setDisableButton(false)
            setMessage('')
        }       
        setText(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length >= 10) {
            const newFeedback = {
                text,
                rating
            }
            feedbackEdit.edit ? updateFeedback(feedbackEdit.item.id, newFeedback) : addFeedback(newFeedback)
        }
            text.trim().length < 10 && alert('Nice try!')
            setText('')
            setDisableButton(true)
            setRating(10)
        }

    const handleReset = (e) => {
        e.preventDefault()
        editFeedback({})
        setRating(10)
        setMessage('')
    }


  return (
    <Card>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h3>How would You rate our service?</h3>
        <SelectRating number={10} selected={rating} select={(rating) => setRating(rating)}/>
        <div className="input-group">
            <input id='feedbackFormInput' onChange={handleTextChange} type="text" placeholder='Write a review' value={text}/>
            <Button type='submit' isDisabled={disableButton}>{feedbackEdit.edit ? 'Update' : 'Send'}</Button>
            <Button type='reset' display={feedbackEdit.edit}>Cancel</Button>      

        </div>{message && <p className='message'>{message}</p>}
        <div className="cancel">
        </div>    
      </form>
    </Card>
  )
}

export default FeedbackForm
