import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import {addListToDropdown, createDropdown} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import SplitButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/splitbuttonview';
import imageIcon from '@alexkrulik/ckeditor5-insertdropdown/theme/icons/user.svg';

export default class InsertDropDown extends Plugin {
	init() {
		const editor = this.editor;

		editor.commands.add('mySimpleCommand', { // create named command
			exec: function (edt) {
				alert(edt.getData());
			}
		});

		editor.ui.componentFactory.add('InsertDropDown', locale => {
			const dropdownView = createDropdown(locale, SplitButtonView);

			dropdownView.buttonView.actionView.set({
				withText: true,
				label: 'Add Placeholder',
				icon: imageIcon,
				tooltip: true
			});

			const items = new Collection();

			const dropdowns = editor.config.get('dropdownlist');

			dropdowns.forEach(function (item) {
				items.add({
					type: 'button',
					model: new Model({
						withText: true,
						label: item.label,
						value: item.value
					})
				});
			});

			addListToDropdown(dropdownView, items);

			dropdownView.on('execute', evt => {
				editor.model.change(writer => {
					editor.model.insertContent(writer.createText(evt.source.value + ' '));
				});
			});

			return dropdownView;
		});
	}
}
