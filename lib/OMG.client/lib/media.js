module.exports = Media;

function Media(type, author){ // mime type ?

	this.owner = author;
	this.title = 'Sans Titre';
	this.subTitles = [];
	this.description = '';
	this.file = undefined; // TBDefined in next step. Default name should be last_name_date.file
	this.file_namespace = undefined; // eg.'.js'
	this.publisherTags = this.ownerTags = this.publicTags = [];
	this.dateCreatedLocal = new Date().getTime();
	this._id = Math.random();
	this.parentFile = null;
	this.children = [];
	this.type = type;
	this.location = undefined;
	this.fileMetaData = null;
	this.publisher = undefined;
	this.comments = [];
	this.notes = [];
	this.edits = [];
	switch (type) {
		case 'text':
			this.type = 'text/text'
			return this
		break;
	}
}