
declare global {
  interface Window {
    d365mktformcapture: {
      waitForElement: (selector: string) => Promise<HTMLFormElement>;
      serializeForm: (form: HTMLFormElement, mappings: any[]) => any;
      submitForm: (config: any, payload: any) => void;
    };
  }
}

export const initializeDynamics365FormCapture = (formSelector: string) => {
  // Load the Dynamics 365 form capture script
  const script = document.createElement('script');
  script.src = 'https://cxppusa1formui01cdnsa01-endpoint.azureedge.net/eur/FormCapture/FormCapture.bundle.js';
  document.head.appendChild(script);

  script.onload = () => {
    window.d365mktformcapture.waitForElement(formSelector)
      .then(form => {
        const mappings = [
          {
            FormFieldName: "nip",
            DataverseFieldName: "an_an_taxnumber",
          },
          {
            FormFieldName: "company",
            DataverseFieldName: "an_an_companyname",
          },
          {
            FormFieldName: "firstName",
            DataverseFieldName: "firstname",
          },
          {
            FormFieldName: "lastName",
            DataverseFieldName: "lastname",
          },
          {
            FormFieldName: "serviceInterest",
            DataverseFieldName: "jobtitle",
          },
          {
            FormFieldName: "email",
            DataverseFieldName: "emailaddress1",
          },
          {
            FormFieldName: "phone",
            DataverseFieldName: "mobilephone",
          },
          {
            FormFieldName: "marketingConsent",
            DataverseFieldName: "msdynmkt_purposeid;channels;optinwhenchecked",
            DataverseFieldValue: "7744ce7e-e68a-ef11-ac21-000d3ab16d95;Email,Text;true",
          },
          {
            FormFieldName: "acceptTerms",
            DataverseFieldName: "an_privacypolicyaccepted",
            DataverseFieldValue: [
              { FormValue: "true", DataverseValue: "1" },
            ],
          },
          {
            FormFieldName: "acceptTerms",
            DataverseFieldName: "an_roadshowtermsandconditionsaccepted",
            DataverseFieldValue: [
              { FormValue: "true", DataverseValue: "1" },
            ],
          },
          {
            FormFieldName: "industry",
            DataverseFieldName: "cr8b4_bazawiedzy",
          },
          {
            FormFieldName: "contactSource",
            DataverseFieldName: "an_contactsource",
            DataverseFieldValue: [
              { FormValue: "website", DataverseValue: "188040003" }, // FORMULARZ WWW
            ],
          },
          {
            FormFieldName: "message",
            DataverseFieldName: "description",
          },
        ];

        form.addEventListener("submit", (e) => {
          const serializedForm = window.d365mktformcapture.serializeForm(form, mappings);
          const payload = serializedForm.SerializedForm.build();

          const captureConfig = {
            FormId: "219e852c-dc59-f011-bec2-0022489c8d24",
            FormApiUrl: "https://public-eur.mkt.dynamics.com/api/v1.0/orgs/1e5b64c1-c132-4237-9477-532bcddae3fd/landingpageforms"
          };
          
          window.d365mktformcapture.submitForm(captureConfig, payload);
        }, true);
      });
  };
};
