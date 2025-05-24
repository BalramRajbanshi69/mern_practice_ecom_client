import React from 'react'

const Services = () => {
  return (
    <div>

    <div class="container mt-5">
        <h1 class="text-center mb-4">Our Services</h1>
        <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title"><i class="bi bi-truck primary-color me-2"></i> Fast & Reliable Shipping</h5>
                        <p class="card-text">We partner with trusted carriers to ensure your orders are delivered quickly and securely. Enjoy various shipping options to suit your needs.</p>
                        <ul class="list-unstyled">
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> Same-day dispatch for eligible orders</li>
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> Real-time tracking information</li>
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> Secure packaging to protect your items</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title"><i class="bi bi-arrow-clockwise primary-color me-2"></i> Easy Returns & Exchanges</h5>
                        <p class="card-text">We understand that sometimes things don't work out. Our hassle-free return and exchange policy makes it easy to get the right product.</p>
                        <ul class="list-unstyled">
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> 30-day return window</li>
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> Simple online return process</li>
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> Options for exchange or full refund</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title"><i class="bi bi-headset primary-color me-2"></i> Dedicated Customer Support</h5>
                        <p class="card-text">Our friendly and knowledgeable customer support team is here to assist you with any questions or concerns you may have.</p>
                        <ul class="list-unstyled">
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> Available via email, phone, and chat</li>
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> Prompt and helpful responses</li>
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> Comprehensive FAQs section</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title"><i class="bi bi-shield-check primary-color me-2"></i> Secure Payment Options</h5>
                        <p class="card-text">We offer a variety of secure payment methods to ensure your transactions are safe and convenient.</p>
                        <ul class="list-unstyled">
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> Credit and debit card processing</li>
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> Support for popular digital wallets</li>
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i> Encrypted transactions for your security</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="bg-dark text-light py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5>About Us</h5>
                    <p>Your go-to online store for quality products and excellent service.</p>
                </div>
                <div class="col-md-4">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-light">Home</a></li>
                        <li><a href="#" class="text-light">Products</a></li>
                        <li><a href="#" class="text-light">Services</a></li>
                        <li><a href="#" class="text-light">Contact</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5>Follow Us</h5>
                    <ul class="list-inline">
                        <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-facebook-f"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-instagram"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-twitter"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-github"></i></a></li>
                <li className="list-inline-item"><a href="#" className="text-light"><i className="fa-brands fa-linkedin-in"></i></a></li>
                    </ul>
                </div>
            </div>
            <hr className="my-3"/>
            <p >&copy; 2025 Your E-commerce Store. All rights reserved.</p>
        </div>
    </footer>

    </div>
  )
}

export default Services