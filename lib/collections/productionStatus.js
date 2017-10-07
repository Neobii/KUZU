ProductionStatuses = new Mongo.Collection('productionStatuses');

ProductionStatuses.attachSchema({
  productionStatusName: {
    type: String,
    label: "Production Status Name"
  },
  metaData: {
    type: String,
    label: "Meta Data"
  },
  isShowingMetaData: {
    type: Boolean,
    label: "Show Meta Data"
  },
  additionalContent: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor' // optional
       // settings: // summernote options goes here
      }
    }
  }
})