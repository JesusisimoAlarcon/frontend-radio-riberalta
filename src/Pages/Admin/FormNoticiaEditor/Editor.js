import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InlineEditor from '@ckeditor/ckeditor5-build-inline'
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
const editorConfiguration = {
    //plugins: [Essentials, Bold, Italic, Paragraph],
    //toolbar: ['bold', 'italic']
    //blockToolbar: ['paragraph', 'heading1', 'heading2', '|', 'bulletedList', 'numberedList'],
    //plugins: [ Essentials, Paragraph, Bold, Italic, Heading ],
    //toolbar: ['heading', '|', 'bold', 'italic', '|', 'undo', 'redo'],
    language: 'es',
    image: {
        // You need to configure the image toolbar, too, so it uses the new style buttons.
        toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],

        styles: [
            // This option is equal to a situation where no style is applied.
            'full',

            // This represents an image aligned to the left.
            'alignLeft',

            // This represents an image aligned to the right.
            'alignRight'
        ]
    }
    //toolbar: [BalloonBlockEditor]
};
class Editor extends Component {
    render() {

        const { setContenido } = this.props;

        return (
            <div className="">
                <CKEditor
                    editor={InlineEditor}
                    //editor={BalloonBlockEditor}
                    config={editorConfiguration}
                    data="Contenido de la noticia"
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        //console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        //setContenido(data)
                        //console.log({ event, editor, data });
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        //console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        //console.log('Focus.', editor);
                    }}
                />
            </div>
        );
    }
}

export default Editor; 