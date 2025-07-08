import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface IframePopupProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  redirectAfterSubmit?: boolean;
  redirectUrl?: string;
}

export function IframePopup({ 
  isOpen, 
  onClose, 
  url, 
  redirectAfterSubmit = false,
  redirectUrl = "/thank-you"
}: IframePopupProps) {
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Function to handle form submission detection
  const handleFormSubmission = () => {
    console.log("Form submission detected");
    setFormSubmitted(true);
    // Keep the close functionality but remove the redirect
    onClose();
    // navigate(redirectUrl); // Redirect removed
  };
  // Handle escape key to close the popup
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);
  
  // Listen for messages from the iframe
  useEffect(() => {
    if (!isOpen || !redirectAfterSubmit) return;
    
    // Function to handle messages from iframe
    const handleMessage = (event: MessageEvent) => {
      // Check if the message indicates form submission
      // This is a basic example - you may need to adjust based on the actual messages sent
      if (event.data && typeof event.data === 'string' && 
          (event.data.includes('submit') || event.data.includes('form') || event.data.includes('success'))) {
        handleFormSubmission();
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isOpen, redirectAfterSubmit, redirectUrl, formSubmitted, onClose, navigate]);
  
  // Create a custom button for manual redirect after form submission
  useEffect(() => {
    if (!isOpen || !redirectAfterSubmit) return;
    
    // Create a floating button that appears after a delay
    // This gives users time to fill out and submit the form
    const createRedirectButton = () => {
      // Wait 20 seconds before showing the button to give users time to fill the form
      const buttonTimeoutId = setTimeout(() => {
        // Create floating button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'fixed';
        buttonContainer.style.bottom = '20px';
        buttonContainer.style.right = '20px';
        buttonContainer.style.zIndex = '100000';
        buttonContainer.style.padding = '10px';
        buttonContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        buttonContainer.style.borderRadius = '8px';
        buttonContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'column';
        buttonContainer.style.alignItems = 'center';
        buttonContainer.style.gap = '10px';
        buttonContainer.id = 'redirect-button-container';
        
        // Create info text
        const infoText = document.createElement('div');
        infoText.textContent = 'Po wypełnieniu formularza i kliknięciu "Wyślij":';
        infoText.style.fontSize = '14px';
        infoText.style.color = '#333';
        infoText.style.textAlign = 'center';
        buttonContainer.appendChild(infoText);
        
        // Create the button
        const redirectButton = document.createElement('button');
        redirectButton.textContent = 'Przejdź dalej';
        redirectButton.style.backgroundColor = '#0055a5'; // Primary color
        redirectButton.style.color = 'white';
        redirectButton.style.border = 'none';
        redirectButton.style.borderRadius = '4px';
        redirectButton.style.padding = '8px 16px';
        redirectButton.style.cursor = 'pointer';
        redirectButton.style.fontWeight = 'bold';
        redirectButton.style.fontSize = '14px';
        redirectButton.style.width = '100%';
        redirectButton.onclick = () => {
          console.log("Manual redirect button clicked");
          handleFormSubmission();
          // Remove the button container after click
          document.body.removeChild(buttonContainer);
        };
        
        // Add hover effect
        redirectButton.onmouseover = () => {
          redirectButton.style.backgroundColor = '#004080';
        };
        redirectButton.onmouseout = () => {
          redirectButton.style.backgroundColor = '#0055a5';
        };
        
        buttonContainer.appendChild(redirectButton);
        document.body.appendChild(buttonContainer);
      }, 20000); // Show after 20 seconds
      
      return () => {
        clearTimeout(buttonTimeoutId);
        const container = document.getElementById('redirect-button-container');
        if (container) {
          document.body.removeChild(container);
        }
      };
    };
    
    const cleanup = createRedirectButton();
    
    return cleanup;
  }, [isOpen, redirectAfterSubmit, formSubmitted]);
  
  // Monitor for form submission by watching for URL changes in the iframe
  useEffect(() => {
    if (!isOpen || !redirectAfterSubmit) return;
    
    let initialUrl = '';
    let urlCheckInterval: ReturnType<typeof setInterval> | null = null;
    
    // Function to check if URL is the specific thank you page
    const isThankYouUrl = (url: string): boolean => {
      // Check specifically for the anegis thank you page
      const isMatch = url.includes('anegis.com/pl/dziekujemy') || 
                      url.includes('dziekujemy-za-rejestracje') || 
                      url.includes('thank-you') || 
                      url.includes('thankyou') || 
                      url.includes('success');
      
      if (isMatch) {
        console.log("Thank you URL detected:", url);
      }
      
      return isMatch;
    };
    
    // Set up polling to check iframe URL regularly - for logging purposes only
    const startUrlPolling = () => {
      console.log("Starting URL polling for thank you page detection (logging only)");
      urlCheckInterval = setInterval(() => {
        try {
          // Try to access iframe location
          const iframeWindow = iframeRef.current?.contentWindow;
          if (iframeWindow && iframeWindow.location) {
            const currentUrl = iframeWindow.location.href;
            console.log("Current iframe URL:", currentUrl);
            
            // Just log if we detect the thank you URL
            if (currentUrl && isThankYouUrl(currentUrl)) {
              console.log("Thank you URL detected in polling");
              // No redirect or form submission handling
              if (urlCheckInterval) {
                clearInterval(urlCheckInterval);
              }
            }
          }
        } catch (e) {
          // Try to check if we're in the thank you page by checking if the iframe has a title that contains thank you terms
          try {
            const iframeDocument = iframeRef.current?.contentDocument;
            if (iframeDocument) {
              const pageTitle = iframeDocument.title;
              console.log("Iframe title:", pageTitle);
              
              if (pageTitle && (pageTitle.toLowerCase().includes('thank') || 
                                pageTitle.toLowerCase().includes('dziekujemy') || 
                                pageTitle.toLowerCase().includes('success'))) {
                console.log("Thank you page detected via title");
                // No redirect or form submission handling
                if (urlCheckInterval) {
                  clearInterval(urlCheckInterval);
                }
              }
              
              // Also check for thank you content in the body
              const bodyText = iframeDocument.body?.textContent;
              if (bodyText && (bodyText.toLowerCase().includes('thank you') || 
                              bodyText.toLowerCase().includes('dziękujemy') || 
                              bodyText.toLowerCase().includes('dziekujemy'))) {
                console.log("Thank you content detected in body");
                // No redirect or form submission handling
                if (urlCheckInterval) {
                  clearInterval(urlCheckInterval);
                }
              }
            }
          } catch (innerError) {
            // CORS error accessing document - this is expected
            // console.log("CORS error accessing iframe document", innerError);
          }
        }
      }, 1000); // Check every second
    };
    
    // Start polling after a short delay to let the iframe load
    const pollingTimeoutId = setTimeout(startUrlPolling, 2000);
    
    // Set up a listener for the iframe load event as well
    const handleIframeLoad = () => {
      console.log("Iframe load event triggered");
      try {
        const currentUrl = iframeRef.current?.contentWindow?.location.href;
        console.log("Iframe loaded with URL:", currentUrl);
        
        if (currentUrl) {
          // If this is the first load, store the URL
          if (!initialUrl) {
            initialUrl = currentUrl;
            console.log("Initial URL set to:", initialUrl);
            return;
          }
          
          console.log("URL changed from", initialUrl, "to", currentUrl);
          
          // Just log if we detect the thank you URL
          if (isThankYouUrl(currentUrl)) {
            console.log("Thank you URL detected in load event");
            // No redirect or form submission handling
          }
        }
      } catch (e) {
        console.log("CORS error accessing iframe URL", e);
        // Try to check if we can access the document title
        try {
          const title = iframeRef.current?.contentDocument?.title;
          console.log("Iframe title after CORS error:", title);
        } catch (titleError) {
          // Expected CORS error
        }
      }
    };
    
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }
    
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
      if (urlCheckInterval) {
        clearInterval(urlCheckInterval);
      }
      clearTimeout(pollingTimeoutId);
    };
  }, [isOpen, redirectAfterSubmit, formSubmitted]);

  // Log when component renders or updates
  useEffect(() => {
    if (isOpen) {
      console.log("IframePopup opened with URL:", url);
    }
  }, [isOpen, url]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] max-h-[90vh] p-0">
        <div className="sr-only">Dialog Content</div> {/* Add accessible title */}
        <div className="absolute top-2 right-2 z-20">
          <button 
            onClick={onClose}
            className="rounded-full p-1 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="relative w-full h-[80vh]">
          {/* Targeted corner popup blocker - transparent but blocks interactions */}
          <div className="absolute top-0 right-0 w-[180px] h-[100px] z-10 bg-transparent pointer-events-auto"></div>
          
          <iframe 
            ref={iframeRef}
            src={url} 
            className="w-full h-full border-0" 
            title="External Content"
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => console.log("Iframe onLoad event fired")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
