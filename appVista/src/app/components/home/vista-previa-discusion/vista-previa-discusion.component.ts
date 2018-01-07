import { Component, OnInit, ViewChild} from '@angular/core';
import { DiscusionesService } from '../../../services/discusiones.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-vista-previa-discusion',
  templateUrl: './vista-previa-discusion.component.html',
  styleUrls: ['./vista-previa-discusion.component.css']
})
export class VistaPreviaDiscusionComponent implements OnInit {
  discusionPregunta: Object;
  estadoDiscusion;
  @ViewChild('actualizacionExitosa') actualizacionExitosa: SwalComponent;
  @ViewChild('actualizacionErronea') actualizacionErronea: SwalComponent;
  constructor(private discusiones: DiscusionesService) {
    this.discusiones.loadMiDiscusionPregunta(this.discusiones.getIdCuerpoDiscusion()).subscribe(res => {
      this.discusionPregunta = res;
      this.estadoDiscusion = res['estados'];
      console.log(this.discusionPregunta);

    });
  }

  ngOnInit() {
  }
  cerrarIssue () {
    console.log(this.discusiones.getIdCuerpoDiscusion());
    this.discusiones.cerrarDiscusion().subscribe((res) => {
      if (res['status'] === 200) {
        this.actualizacionExitosa.show();
        console.log(res);
        this.discusionPregunta['fecha_cierre'] = res['fecha_cierre'];
        this.estadoDiscusion = res['estado'];
      }else {
        this.actualizacionErronea.show();
      }
    });
  }

}
