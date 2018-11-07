ProductionStatuses = new Mongo.Collection('productionStatuses')

ProductionStatuses.allow({
  insert: function(userId, doc) {
    return !!userId
  },
  update: (userId, doc) => {
    return !!userId
  },
})

ProductionStatuses.attachSchema({
  productionStatusName: {
    type: String,
    label: 'Production Status Name',
  },
  metaData: {
    type: String,
    label: 'Meta Data',
  },
  isShowingMetaData: {
    type: Boolean,
    label: 'Show Meta Data',
  },
  additionalContent: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor', // optional
        // settings: // summernote options goes here
      },
    },
  },
  isShowingAdditionalContent: {
    type: Boolean,
    label: 'Show Additional Content',
  },
  isActive: {
    type: Boolean,
    label: 'Is this production status active?',
  },
  userId: {
    type: String,
    autoValue() {
      if (this.isInsert) {
        return this.userId
      }
    },
    autoform: {
      type: 'hidden',
    },
  },
  producersNote: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor', // optional
        // settings: // summernote options goes here
      },
    },
  },
})
