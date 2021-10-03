import { Component, OnInit } from '@angular/core';
import {CommonHttpService} from '../../../services/common-http.service';
import {Router} from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {ChartDataSets , ChartOptions} from 'chart.js'; 

@Component({
  selector: 'app-investors-cart',
  templateUrl: './investors-cart.component.html',
  styleUrls: ['./investors-cart.component.css']
})
export class InvestorsCartComponent implements OnInit {
  cartData:any;
  spinner:Boolean = true;
  investorDetails:any;
  showDetails = false;
  invsAdded:any;
  invsSuccess:any;
  invsDeleted:any;
  added:Boolean = false;
  del:Boolean = false;
  success:Boolean = false;
  transData:any;
  constructor(
    private httpSrv:CommonHttpService,
    private router:Router
  ) { }

  public mainChartLabels: Array<any> = [];
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff',
    }
  ];
  radioModel: string = 'Month';
  public mainChartType = 'pie';

  public mainChartLegend = true;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];
  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1, label: 'Series A'
    },
    {
      data: this.mainChartData2, label: 'Series B'
    },
    {
      data: this.mainChartData3, label: 'Series c'
    }
  ];

  public mainChartOptions: any = {
    tooltips: {
      enabled: true,
      custom: CustomTooltips,
      intersect: false,
      mode: 'point',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor  };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: true,
        },  
        ticks: {
          callback: function(value: any) {
            return value;
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5)
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: true
    },
    title: {
      display: true,
      text: 'Investor Cart Details'
  }
  };

  ngOnInit() {
    this.httpSrv.getMoreData('cart/get_cart_items',{}).subscribe(data=>{
      console.log("sri",data);
      
      this.cartData = data;
      this.spinner = false;
      
    },err=>{
      console.log("error while getiing users cart");
      
    });

    // this.httpSrv.get('gettransactions').subscribe(data=>{
    //   console.log("transaction data",data);
    // },err=>{
    //   console.log("no transactions");
      
    // });

    // this.httpSrv.get('getpurchase').subscribe(data=>{
    //   console.log("purchase data",data);
    // },err=>{
    //   console.log("no purchase",err);
      
    // });

  }

  getTrans(email , data){
    let pdata : any = {};
    pdata.mail = email;
    this.httpSrv.post('gettransdetails' ,pdata).subscribe(data=>{
      console.log("data det",data);
      this.transData = data;
      this.formatCart();
    },err=>{
      console.log(err);
      
    })
  }

  formatCart(){
    this.invsSuccess.forEach(element => {
      console.log(element);
      
      this.transData.forEach(ele => {
        if(ele.isin == element.isin){
          element['current'] = ele.current;
        }
      });
    });
  }


  InvestorDetails(email:any){
   
    this.investorDetails = this.cartData.filter(X=>X.email==email);
    this.showDetails = true;
    // this.router.navigate(['cart/details',email]);
    this.invsAdded = this.investorDetails.filter(x=>x.flag == 1);
    this.invsDeleted = this.investorDetails.filter(x=>x.flag == 0);
    this.invsSuccess = this.investorDetails.filter(x=>x.flag == 2);
    this.getTrans(email , this.invsSuccess);
    console.log(this.invsSuccess);
    for (let i = 0; i < this.invsAdded.length; i++) {
      this.mainChartData1.push(this.invsAdded[i]['amount']);
      this.mainChartLabels.push('Added');
    }
    for (let j = 0; j < this.invsDeleted.length; j++) {
      this.mainChartData2.push(this.invsDeleted[j]['amount']);
      this.mainChartLabels.push('Deleted');
    }

    for (let k = 0; k < this.invsSuccess.length; k++) {
      
      this.mainChartData3.push(this.invsSuccess[k]['amount']);
      this.mainChartLabels.push('Sucess');
    }
    
    
  }

  ShowTab(e){
    console.log("coming", e.active[0]._chart.config.data.labels[e.active[0]._index]);
    let labelActive = e.active[0]._chart.config.data.labels[e.active[0]._index];
    if(labelActive == 'Added'){
      this.added = true;
      this.del = false;
      this.success = false;
    }else if(labelActive == 'Deleted') {

      this.added = false;
      this.success = false;
      this.del = true;
    } else {
      this.added = false;
      this.del = false;
      this.success = true;
    }
    if(e.active.length > 0) {
      console.log("Index", e.active[0]._index);
      console.log("Data" , e.active[0]._chart.config.data.datasets[0].data[e.active[0]._index]);
      console.log("Label" , e.active[0]._chart.config.data.labels[e.active[0]._index]);
      }
    
    
  }

  updateUnits(u , t , id){
    console.log(u.value,t.value);
    let pdata:any = {};
    pdata.id = id;
    pdata.units = u.value;
    pdata.date = t.value;
    
    this.httpSrv.post('updateunits',pdata).subscribe(data=>{
      console.log("laksdjf",data);
      
    })
  }

}