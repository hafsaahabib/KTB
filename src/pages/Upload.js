import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Navbar';

function storageKey(lang, genre) {
  return `folio_books_${lang}_${genre}`;
}

function loadBooks(lang, genre) {
  try {
    const data = localStorage.getItem(storageKey(lang, genre));
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveBooks(lang, genre, books) {
  localStorage.setItem(storageKey(lang, genre), JSON.stringify(books));
}

export default function Upload() {
  const { lang, genre } = useParams();
  const [books, setBooks] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const fileRef = useRef();

  const displayLang = lang.charAt(0).toUpperCase() + lang.slice(1);
  const displayGenre = genre.charAt(0).toUpperCase() + genre.slice(1).replace('-', ' ');

  useEffect(() => {
    setBooks(loadBooks(lang, genre));
  }, [lang, genre]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFile = (file) => {
    if (!file || file.type !== 'application/pdf') {
      showToast('Please upload a valid PDF file.', 'error');
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const newBook = {
        id: Date.now(),
        name: file.name.replace('.pdf', ''),
        size: (file.size / 1024).toFixed(0) + ' KB',
        date: new Date().toLocaleDateString('en-GB'),
        data: e.target.result,
      };
      const updated = [...books, newBook];
      setBooks(updated);
      saveBooks(lang, genre, updated);
      setUploading(false);
      showToast(`"${newBook.name}" uploaded successfully!`);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const updated = books.filter(b => b.id !== id);
    setBooks(updated);
    saveBooks(lang, genre, updated);
    showToast('Book removed.', 'info');
  };

  const handleDownload = (book) => {
    const link = document.createElement('a');
    link.href = book.data;
    link.download = `${book.name}.pdf`;
    link.click();
  };

  return (
    <div className="page">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'} {toast.msg}
        </div>
      )}

      {/* Header */}
      <section className="page-hero page-hero--upload">
        <div className="page-hero__content">
          <div className="page-hero__breadcrumb">
            <Link to="/language">Languages</Link>
            <span> / </span>
            <Link to={`/language/${lang}`}>{displayLang}</Link>
            <span> / </span>
            <span>{displayGenre}</span>
          </div>
          <h1 className="page-hero__title">{displayGenre}<br /><em>{displayLang} Books</em></h1>
          <p className="page-hero__sub">Upload a PDF to share with the community, or click a book to download it.</p>
        </div>
      </section>

      <section className="upload-section">

        {/* Drop Zone */}
        <div
          className={`dropzone ${dragging ? 'dropzone--active' : ''} ${uploading ? 'dropzone--loading' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
          {uploading ? (
            <div className="dropzone__spinner" />
          ) : (
            <>
              <div className="dropzone__icon">📄</div>
              <p className="dropzone__label">
                {dragging ? 'Drop your PDF here' : 'Drag & drop a PDF, or click to browse'}
              </p>
              <p className="dropzone__hint">Only PDF files are accepted</p>
            </>
          )}
        </div>

        {/* Book Shelf */}
        {books.length > 0 ? (
          <div className="shelf">
            <div className="shelf__header">
              <h2>Uploaded Books</h2>
              <span className="shelf__count">{books.length} book{books.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="book-grid">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="book-card"
                  onClick={() => handleDownload(book)}
                  title="Click to download"
                >
                  <div className="book-card__spine" />
                  <div className="book-card__cover">
                    <div className="book-card__icon">📕</div>
                    <h4 className="book-card__name">{book.name}</h4>
                    <div className="book-card__meta">
                      <span>{book.size}</span>
                      <span>{book.date}</span>
                    </div>
                    <div className="book-card__download">⬇ Download</div>
                  </div>
                  <button
                    className="book-card__delete"
                    onClick={(e) => handleDelete(book.id, e)}
                    title="Remove book"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="shelf-empty">
            <div className="shelf-empty__icon">🕮</div>
            <p>No books yet in <strong>{displayGenre} / {displayLang}</strong>.</p>
            <p>Be the first to upload one!</p>
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="footer__brand">KTB</div>
        <p className="footer__copy">© 2026 DIJITAL KITABISTAN. Built with ❤️ for readers everywhere.</p>
        <a href="mailto:contact@KTB.com" className="footer__email">contact@KTB.com</a>
      </footer>
    </div>
  );
}