import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import DropdownButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/dropdownbuttonview';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

export default class PlaceholderDropDown extends Plugin {
	init() {
		this.editor.ui.componentFactory.add( 'PlaceholderDropDown', locale => {
			const dropdownView = createDropdown( locale, DropdownButtonView );

			dropdownView.buttonView.set( {
				withText: true,
				label: 'Placeholder',
				tooltip: true
			} );

			const items = new Collection();

			this.editor.config.get( 'dropdownlist' ).forEach( item => {
				items.add( {
					type: 'button',
					model: new Model( {
						withText: true,
						label: item.label,
						value: item.value
					} )
				} );
			} );

			addListToDropdown( dropdownView, items );

			dropdownView.on( 'execute', event => {
				this.editor.model.change( writer => {
					this.editor.model.insertContent( writer.createText( event.source.value + ' ' ) );
				} );
			} );

			return dropdownView;
		} );
	}
}
