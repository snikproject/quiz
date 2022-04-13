import { createRoot } from 'react-dom/client';
import QuizApp from './components/QuizApp';
import './style.css';

const root = createRoot(document.getElementById('root'));
root.render(<QuizApp />);
