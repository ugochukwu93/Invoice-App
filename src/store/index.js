import { createStore } from 'vuex'
import db from "../firebase/firebaseInit"

export default createStore({
  state: {
    invoiceData : [],
    invoicesLoaded: null,
    invoiceModal: null,
    modalActive: null,
    currentInvoiceArray: null,
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_INVOICE_DATA(state, payload) {
      state.invoiceData.push(payload)
      console.log(state.invoiceData)
    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoiceArray = state.invoiceData.filter((invoice) => {
        return invoice.invoiceId === payload;
      })
    }
  },
  actions: {
    async GET_INVOICES({commit, state }){
      const getData = db.collection("invoice");
      const results = await getData.get();
      results.forEach((doc) => {
        if (!state.invoiceData.some(invoice => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerCity: doc.data().billerCity,
            billerZipcode: doc.data().billerZipcode,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid

          };
          commit('SET_INVOICE_DATA', data)
        }
      });
      commit('INVOICES_LOADED')
    }
  },
  modules: {
  }
})
